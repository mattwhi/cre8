"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type BlockType = "text" | "image" | "video";

export interface BlockSettings {
  backgroundColor?: string;
  alignment?: "left" | "center" | "right";
}

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  settings?: BlockSettings;
}

interface SortableItemProps {
  block: Block;
  onEdit: (block: Block) => void;
}

function SortableItem({ block, onEdit }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Render block preview based on its type.
  let renderedContent;
  if (block.type === "text") {
    renderedContent = (
      <p
        style={{
          textAlign: block.settings?.alignment || "left",
          backgroundColor: block.settings?.backgroundColor || "transparent",
        }}
        className="text-gray-800 dark:text-gray-200"
      >
        {block.content}
      </p>
    );
  } else if (block.type === "image") {
    renderedContent = (
      <img
        src={block.content}
        alt="Block image"
        className="w-full object-cover rounded"
      />
    );
  } else if (block.type === "video") {
    // For simplicity, we'll embed the video with an iframe.
    renderedContent = (
      <div className="w-full aspect-video">
        <iframe
          src={block.content}
          title="Video Block"
          frameBorder="0"
          allowFullScreen
          className="w-full h-full rounded"
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-white dark:bg-gray-700 rounded shadow mb-2"
    >
      {renderedContent}
      <div className="mt-2 flex justify-end">
        <button
          onClick={() => onEdit(block)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

interface PageBuilderProps {
  onChange?: (blocks: Block[]) => void;
}

export default function PageBuilder({ onChange }: PageBuilderProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blockType, setBlockType] = useState<BlockType>("text");
  const [blockContent, setBlockContent] = useState("");
  const [settings, setSettings] = useState<BlockSettings>({
    backgroundColor: "",
    alignment: "left",
  });
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const addBlock = () => {
    if (!blockContent.trim()) return;
    const newBlock: Block = {
      id: `${Date.now()}`,
      type: blockType,
      content: blockContent,
      settings: { ...settings },
    };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    setBlockContent("");
    onChange && onChange(updatedBlocks);
  };

  const updateBlock = (updated: Block) => {
    const updatedBlocks = blocks.map((b) =>
      b.id === updated.id ? updated : b
    );
    setBlocks(updatedBlocks);
    setEditingBlock(null);
    onChange && onChange(updatedBlocks);
  };

  const removeBlock = (id: string) => {
    const updatedBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(updatedBlocks);
    onChange && onChange(updatedBlocks);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      const updatedBlocks = arrayMove(blocks, oldIndex, newIndex);
      setBlocks(updatedBlocks);
      onChange && onChange(updatedBlocks);
    }
  };

  // Render a modal-like editing section if editingBlock is set.
  const renderEditModal = () => {
    if (!editingBlock) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Edit Block</h3>
          <textarea
            value={editingBlock.content}
            onChange={(e) =>
              setEditingBlock({ ...editingBlock, content: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
            placeholder={
              editingBlock.type === "text" ? "Edit text..." : "Edit URL..."
            }
          />
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (editingBlock) updateBlock(editingBlock);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditingBlock(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Page Builder</h2>

      {/* Controls for adding a block */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <select
          value={blockType}
          onChange={(e) => setBlockType(e.target.value as BlockType)}
          className="p-2 border rounded"
        >
          <option value="text">Text Block</option>
          <option value="image">Image Block</option>
          <option value="video">Video Block</option>
        </select>
        <input
          type="text"
          placeholder={blockType === "text" ? "Enter text..." : "Enter URL..."}
          value={blockContent}
          onChange={(e) => setBlockContent(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addBlock}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Block
        </button>
      </div>

      {/* Optional block settings */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Background Color (e.g., #ffffff)"
          value={settings.backgroundColor}
          onChange={(e) =>
            setSettings({ ...settings, backgroundColor: e.target.value })
          }
          className="p-2 border rounded flex-1"
        />
        <select
          value={settings.alignment}
          onChange={(e) =>
            setSettings({
              ...settings,
              alignment: e.target.value as "left" | "center" | "right",
            })
          }
          className="p-2 border rounded flex-1"
        >
          <option value="left">Left Align</option>
          <option value="center">Center Align</option>
          <option value="right">Right Align</option>
        </select>
      </div>

      {/* Drag-and-Drop Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <div key={block.id} className="relative">
              <SortableItem block={block} onEdit={setEditingBlock} />
              <button
                onClick={() => removeBlock(block.id)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                X
              </button>
            </div>
          ))}
        </SortableContext>
      </DndContext>

      {/* Serialized layout preview */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Serialized Layout Data</h3>
        <pre className="bg-gray-200 dark:bg-gray-900 p-4 rounded text-sm">
          {JSON.stringify(blocks, null, 2)}
        </pre>
      </div>

      {renderEditModal()}
    </div>
  );
}
