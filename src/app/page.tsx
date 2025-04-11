"use client";

import UniqueId from "@tiptap-pro/extension-unique-id";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Home() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      UniqueId.configure({
        types: ["paragraph", "image"],
        attributeName: "id",
      }),
    ],
    content: `no content`,
  });

  return (
    <div className="bg-white w-screen h-screen p-4">
      <div className="flex gap-2">
        <button
          className="bg-black text-white p-2 rounded-md"
          onClick={() => {
            if (!editor) return;

            const content = `
<img data-id="a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" src="https://placehold.co/400x400?text=Hello">
<img data-id="9e8d7c6b-5a4f-4e3d-2c1b-0a9b8c7d6e5f" src="https://placehold.co/400x400?text=World">
<p data-id="1933a0b8-289f-4538-9596-22bab7b728d0">A simple paragraph</p>
`;

            editor?.commands.setContent(content);
          }}
        >
          Set content (duplicated IDs and paragraph id change)
        </button>

        <button
          className="bg-black text-white p-2 rounded-md"
          onClick={() => {
            if (!editor) return;

            const content = `
<p data-id="1933a0b8-289f-4538-9596-22bab7b728d0">A simple paragraph</p>
<img data-id="a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" src="https://placehold.co/400x400?text=Hello">
<img data-id="9e8d7c6b-5a4f-4e3d-2c1b-0a9b8c7d6e5f" src="https://placehold.co/400x400?text=World">
`;

            editor?.commands.setContent(content);
          }}
        >
          Set content (second image ID change)
        </button>
      </div>

      <div className="mt-4 mb-2 block text-sm text-gray-600">
        {editor && (
          <div>
            <h3 className="font-medium">Editor HTML:</h3>
            <pre className="bg-gray-100 p-2 rounded-md overflow-auto max-h-40 text-xs">
              {editor.getHTML().replace(/<(\/?)([^>]+)>/g, "<$1$2>\n")}
            </pre>
          </div>
        )}
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
