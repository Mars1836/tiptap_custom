<template>
  <div v-if="editor" class="w-full" @focusin="handleFocus" tabindex="0">
    <div
      class="control-group flex items-center flex-wrap gap-x-4 border border-gray-400 p-4 absolute bg-red-100 z-50"
      v-if="toolbarState.showToolbar"
      :style="{
        top: `${toolbarState.toolbarPosition.top}px`,
        left: `${toolbarState.toolbarPosition.left}px`,
      }"
      id="toolbar"
      ref="toolbar"
      @focusout="handleBlur"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        Strike
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        Code
      </button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        Paragraph
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        H3
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        H4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        H5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        H6
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet list
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        Ordered list
      </button>
    </div>

    <editor-content :editor="editor" ref="editorRef" @click.stop />
  </div>
</template>

<script setup>
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent, useEditor } from "@tiptap/vue-3";
import { reactive, watch, onBeforeUnmount } from "vue";
const toolbarState = reactive({
  showToolbar: false,
  toolbarPosition: { top: 0, left: 0 },
});
let isMouseDown = false;
const editerFocus = ref(false);
const editorRef = ref(null);

const toolbar = ref(null);

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:content"]);
const editor = useEditor({
  editorProps: {
    attributes: {
      class:
        "border border-gray-400 p-4 min-h-[5rem] max-h-[12rem] overflow-y-auto prose max-w-none",
    },
    transformPastedText(text) {
      return text.toUpperCase();
    },
  },
  content: props.content,
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit,
  ],
});
watch(editor, (editorInstance) => {
  if (editorInstance) {
    editorInstance.on("update", () => {
      const newContent = editorInstance.getHTML();
      emit("update:content", newContent);
    });
    // editorInstance.on("transaction", () => {
    //   const { from, to } = editorInstance.state.selection;
    //   console.log(isMouseDown);
    //   if (from === to || !isMouseDown.value) {
    //     // Không có vùng được chọn, ẩn thanh công cụ
    //     toolbarState.showToolbar = false;
    //   } else {
    //     // Cập nhật vị trí thanh công cụ
    //     updateToolbarPosition();
    //   }
    // });
  }
});
const handleBlur = () => {
  // Khi mất focus, ẩn thanh công cụ
  editerFocus.value = false;
  // toolbarState.showToolbar = false;
};
const handleFocus = () => {
  // Khi mất focus, ẩn thanh công cụ
  editerFocus.value = true;
};

const updateToolbarPosition = () => {
  if (editor.value && editor.value.view) {
    const { from, to } = editor.value.state.selection;
    // console.log(from, to);
    if (from !== to) {
      const coords = editor.value.view.coordsAtPos(from);
      if (coords) {
        toolbarState.toolbarPosition.top = coords.top - 80; // Điều chỉnh vị trí phía trên văn bản
        toolbarState.toolbarPosition.left = coords.left;
        toolbarState.showToolbar = true;
      }
    } else {
      toolbarState.showToolbar = false;
    }
  }
};
const handleClickOutsideEditor = (event) => {
  // console.log(event);
  // console.log(editerFocus.value);
  if (editerFocus.value === false) {
    toolbarState.showToolbar = false;
  }
  // if (editorRef.value && !editorRef.value.contains(event.target)) {
  //   // Người dùng đã nhấp ra ngoài editor, ẩn thanh công cụ
  //   toolbarState.value.showToolbar = false;
  // }
};
watch(editerFocus, (n) => {
  if (n === false) {
    // toolbarState.showToolbar = false;
  }
});

onMounted(() => {
  document.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    handleClickOutsideEditor(event);
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
    // console.log(editerFocus.value);
    if (editerFocus.value) {
      updateToolbarPosition();
    }
  });
  document.addEventListener("click", (event) => {
    const toolbar = document.getElementById("toolbar");

    // Kiểm tra xem click có phải vào thanh công cụ hay không
    if (toolbar && toolbar.contains(event.target)) {
      console.log("Đã click vào thanh công cụ!");
      toolbarState.showToolbar = true;
    } else {
      toolbarState.showToolbar = false;
    }
  });
});
// watch(
//   () => props.content,
//   (newContent) => {
//     if (editor) {
//       editor.commands.setContent(newContent);
//     }
//   }
// );

// Clean up when the component is unmounted
// onBeforeUnmount(() => {
//   editor.destroy();
// });
</script>
