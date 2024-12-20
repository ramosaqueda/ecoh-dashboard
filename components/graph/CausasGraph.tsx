// components/graphs/CausasGraph.tsx
'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Causa {
  id: number;
  ruc: string;
  denominacionCausa: string;
}

interface CausaRelacionada {
  id: number;
  causaMadre: Causa;
  causaArista: Causa;
  observacion: string;
}

interface Node {
  id: string;
  ruc: string;
  denominacionCausa: string;
  isMainNode?: boolean;
  color?: string;
  x?: number;
  y?: number;
}

interface Link {
  source: string;
  target: string;
  observacion: string;
}

interface CausasGraphProps {
  causaId: string;
  relaciones: CausaRelacionada[];
  causaPrincipal: Causa;
}

export default function CausasGraph({ causaId, relaciones, causaPrincipal }: CausasGraphProps) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth * 0.9 : 800,
    height: 600
  });
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [hoveredLink, setHoveredLink] = useState<Link | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth * 0.9,
        height: 600
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const graphData = useMemo(() => {
    const nodes: Node[] = [
      {
        id: causaPrincipal.id.toString(),
        ruc: causaPrincipal.ruc,
        denominacionCausa: causaPrincipal.denominacionCausa,
        isMainNode: true,
        color: '#4f46e5'
      }
    ];

    const links: Link[] = [];
    const addedNodes = new Set([causaPrincipal.id.toString()]);

    relaciones.forEach(rel => {
      const relatedCausa = rel.causaMadre.id.toString() === causaId 
        ? rel.causaArista 
        : rel.causaMadre;

      if (!addedNodes.has(relatedCausa.id.toString())) {
        nodes.push({
          id: relatedCausa.id.toString(),
          ruc: relatedCausa.ruc,
          denominacionCausa: relatedCausa.denominacionCausa,
          color: '#22c55e'
        });
        addedNodes.add(relatedCausa.id.toString());
      }

      links.push({
        source: rel.causaMadre.id.toString(),
        target: rel.causaArista.id.toString(),
        observacion: rel.observacion
      });
    });

    return { nodes, links };
  }, [causaId, relaciones, causaPrincipal]);

  const handleNodeClick = useCallback((node: Node) => {
    window.open(`${process.env.NEXT_PUBLIC_FICHACASORUC}?ruc=${node.ruc}`, '_blank');
  }, []);

  const handleNodeHover = useCallback((node: Node | null) => {
    setHoveredNode(node);
    if (node) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  }, []);

  const handleLinkHover = useCallback((link: Link | null) => {
    setHoveredLink(link);
    if (link) {
      document.body.style.cursor = 'help';
    } else {
      document.body.style.cursor = 'default';
    }
  }, []);

  return (
    <Card className="p-4">
      <ForceGraph2D
        graphData={graphData}
        width={windowSize.width}
        height={windowSize.height}
        nodeLabel={node => `${(node as Node).ruc}\n${(node as Node).denominacionCausa}`}
        nodeColor={node => (node as Node).color || '#22c55e'}
        nodeRelSize={8}
        linkColor={link => link === hoveredLink ? '#3b82f6' : '#94a3b8'}
        linkWidth={link => link === hoveredLink ? 3 : 2}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const isHovered = node === hoveredNode;
          const label = (node as Node).ruc;
          const fontSize = isHovered ? 16/globalScale : 14/globalScale;
          
          // Dibujar círculo
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, isHovered ? 10 : 8, 0, 2 * Math.PI);
          ctx.fillStyle = (node as Node).color || '#22c55e';
          ctx.fill();
          
          // Dibujar borde blanco
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Dibujar RUC
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#000';
          ctx.fillText(label, node.x!, node.y! + 15);

          // Dibujar ícono de enlace si está hover
          if (isHovered) {
            const iconSize = 16/globalScale;
            ctx.font = `${iconSize}px "Lucida Console"`;
            ctx.fillText('🔗', node.x! + 20, node.y! - 10);
          }
        }}
        linkCanvasObjectMode={() => hoveredLink ? 'after' : undefined}
        linkCanvasObject={(link, ctx, globalScale) => {
          if (link === hoveredLink) {
            const start = link.source;
            const end = link.target;
            const textPos = {
              x: (start.x + end.x) / 2,
              y: (start.y + end.y) / 2
            };

            // Dibujar fondo para el texto
            const label = (link as Link).observacion;
            ctx.font = `${12/globalScale}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const padding = 4/globalScale;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(
              textPos.x - textWidth/2 - padding,
              textPos.y - 6/globalScale - padding,
              textWidth + padding * 2,
              12/globalScale + padding * 2
            );

            // Dibujar texto
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#1e293b';
            ctx.fillText(label, textPos.x, textPos.y);
          }
        }}
        cooldownTicks={50}
      />
    </Card>
  );
}