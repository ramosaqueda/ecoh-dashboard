// CustomNode.tsx
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    name: string;
    role: string;
    emoji?: string;
    type: 'organization' | 'imputado';
  };
}

const CustomNode = ({ data }: CustomNodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={`px-4 py-2 shadow-md rounded-lg border-2 bg-white min-w-[200px] ${
        data.type === 'organization' 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-green-500 bg-green-50'
      }`}>
        <div className="flex items-center gap-2">
          {data.emoji && (
            <div className={`w-10 h-10 flex items-center justify-center rounded-full
              ${data.type === 'organization' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-green-100 text-green-600'
              }`}>
              <span className="text-xl">{data.emoji}</span>
            </div>
          )}
          <div>
            <div className="font-bold text-gray-900">{data.name}</div>
            <div className="text-gray-500 text-sm">{data.role}</div>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default CustomNode;