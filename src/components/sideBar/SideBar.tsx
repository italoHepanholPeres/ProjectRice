import React from "react";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-gray-900 text-white shadow-lg transition-transform duration-800 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-gray-700 p-4 text-lg font-bold">
          Menu
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✖
          </button>
        </div>
        <ul className="space-y-4 p-4">
          <li className="cursor-pointer hover:text-blue-400">Home</li>
          <li className="cursor-pointer hover:text-blue-400">Buscar</li>
          <li className="cursor-pointer hover:text-blue-400">Sobre</li>
          <li className="cursor-pointer hover:text-blue-400">Contato</li>
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/65" onClick={onClose} />
      )}
    </>
  );
}
