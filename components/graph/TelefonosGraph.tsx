import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TelefonoDrawer } from '@/components/drawer/TelefonoDrawer';

const TelefonosGraph = ({ data }) => {
  const svgRef = useRef(null);
  const [selectedTelefono, setSelectedTelefono] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!data || !data.nodes || !data.links) return;

    // Limpiar el SVG existente
    d3.select(svgRef.current).selectAll("*").remove();

    // Configurar dimensiones
    const width = 800;
    const height = 600;

    // Crear el SVG con zoom
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "bg-white rounded-lg shadow");

    // Agregar zoom
    const g = svg.append("g");
    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      }));

    // Crear la simulación de fuerzas
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links)
        .id(d => d.id)
        .distance(150))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Crear los enlaces
    const link = g.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Tooltip para mostrar información adicional
    const tooltip = d3.select("body").append("div")
      .attr("class", "absolute hidden bg-black text-white p-2 rounded text-sm")
      .style("pointer-events", "none");

    // Crear los nodos
    const node = g.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(drag(simulation))
      .on("click", (event, d) => {
        if (d.type === 'telefono') {
          setSelectedTelefono(d.id);
          setIsDrawerOpen(true);
        }
      })
      .on("mouseover", (event, d) => {
        if (d.type === 'telefono') {
          event.currentTarget.style.cursor = 'pointer';
        }
        
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        
        const tooltipContent = d.type === 'causa' 
          ? `RUC: ${d.label}<br/>Denominación: ${d.denominacion}`
          : `Teléfono: ${d.label}`;
        
        tooltip.html(tooltipContent)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px")
          .classed("hidden", false);
      })
      .on("mouseout", (event) => {
        event.currentTarget.style.cursor = 'default';
        tooltip.classed("hidden", true);
      });

    // Agregar círculos a los nodos
    node.append("circle")
      .attr("r", d => d.type === 'causa' ? 20 : 15)
      .attr("fill", d => d.type === 'causa' ? "#ef4444" : "#3b82f6")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Agregar etiquetas a los nodos
    node.append("text")
      .attr("x", 0)
      .attr("y", d => d.type === 'causa' ? 30 : 25)
      .attr("text-anchor", "middle")
      .attr("fill", "#374151")
      .style("font-size", "12px")
      .text(d => d.type === 'causa' ? `RUC: ${d.label}` : d.label);

    // Función para actualizar la posición de los elementos
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Función para el arrastre de nodos
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    // Limpieza
    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [data]);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedTelefono(null);
  };

  return (
    <div className="w-full h-[600px] flex justify-center items-center p-4">
      <svg ref={svgRef} className="w-full h-full"></svg>
      <TelefonoDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        telefonoId={selectedTelefono}
      />
    </div>
  );
};

export default TelefonosGraph;