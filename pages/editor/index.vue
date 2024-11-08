<template>
  <div class="p-12">
    <div
      v-for="(editor, index) in editors"
      :key="index"
      class="mx-auto max-w-4xl my-8 flex items-center justify-center"
    >
      <tippy interactive placement="bottom" trigger="click">
        <button class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.8em"
            height="1.8em"
            viewBox="0 0 30 30"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8.104 5.552H21M8.104 12H21M8.104 18.448H21m-18-8.06L4.612 12L3 13.612M3 3.94l1.612 1.612L3 7.164m0 9.672l1.612 1.612L3 20.06"
            ></path>
          </svg>
        </button>

        <template #content>
          <div
            class="flex flex-col bg-gray-50 border w-16 text-sm font-semibold"
          >
            <button @click="removeEditor(index)" class="p-1 hover:bg-gray-200">
              Xoá
            </button>
            <button @click="addEditor" class="p-1 hover:bg-gray-200">
              THêm
            </button>
          </div></template
        >
      </tippy>

      <TiptapEditor
        :content="editor.content"
        @update:content="(newContent) => updateContent(index, newContent)"
      />
    </div>
    <div>
      article_id:
      <input
        type="text"
        class="input"
        v-model="article_id"
        placeholder="Nhập article ID"
      />
    </div>
    <button @click="saveEditors">Lưu Tất Cả Nội Dung</button>
    <div v-if="htmlContents.length > 0">
      <h2>Nội Dung (HTML):</h2>
      <div
        v-for="(content, idx) in htmlContents"
        :key="idx"
        v-html="content"
        class="prose mx-auto"
      ></div>
    </div>
    <div v-if="jsonContents.length > 0">
      <h2>Nội Dung Đã Lưu (JSON):</h2>
      <pre class="prose mx-auto">{{ jsonContents }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Tippy } from "vue-tippy";

import TiptapEditor from "~/components/TiptapEditor.vue";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const convertToHTML = (jsonContent) => {
  const a = generateHTML(jsonContent, [StarterKit, Paragraph, Text]);
  return a;
};
const editors = ref([{ content: { type: "doc", content: [] } }]); // Initialize as JSON structure
const jsonContents = ref([]);
const htmlContents = ref([]);
const savedContents = ref([]);
const article_id = ref("");
const listItems = ref(["a", "a", "b"]);
// Add a new editor
const addEditor = () => {
  editors.value.push({ content: { type: "doc", content: [] } });
};

// Update editor content by index
const updateContent = (index, newContent) => {
  editors.value[index].content = newContent; // Should be JSON format
};

// Remove an editor by index
const removeEditor = (index) => {
  editors.value.splice(index, 1);
};

// Save all editor contents as JSON
const saveEditors = async () => {
  jsonContents.value = editors.value.map((editor) => editor.content); // Directly store JSON content
  savedContents.value = editors.value.map((editor, index) => {
    console.log({
      content: editor.content,
      order_num: index,
      article_id: article_id.value,
    });
    return {
      content: editor.content,
      order_num: index,
      article_id: article_id.value,
    };
  });
  convertListJsonTiptaptoHtml(jsonContents.value);
  const a = await createBlocks(savedContents.value);
  console.log(a);
};
const convertListJsonTiptaptoHtml = (jsons) => {
  htmlContents.value = jsons.map((json) => convertToHTML(json));
};
const createBlocks = async (articleBlocks) => {
  try {
    const response = await $fetch("/api/article_block", {
      method: "POST",
      body: articleBlocks, // Gửi `articleBlocks` lên server
    });
    return response;
  } catch (error) {
    return error;
  }
};
</script>

<style>
.input {
  border: 1px solid black;
}
</style>
