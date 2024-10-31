<template>
  <div class="p-12">
    <div
      v-for="(editor, index) in editors"
      :key="index"
      class="border mx-auto max-w-4xl my-8"
    >
      <TiptapEditor
        :content="editor.content"
        @update:content="(newContent) => updateContent(index, newContent)"
      />
      <button @click="removeEditor(index)">Xóa Editor</button>
    </div>
    <button @click="addEditor">Thêm Editor</button>
    <button @click="saveEditors">Lưu Tất Cả Nội Dung</button>

    <div v-if="savedContents.length > 0">
      <h2>Nội Dung Đã Lưu:</h2>
      <div
        v-for="(content, idx) in savedContents"
        :key="idx"
        v-html="content"
        class="prose mx-auto"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TiptapEditor from "~/components/TiptapEditor.vue";

const editors = ref([{ content: "" }]);
const savedContents = ref([]);

const addEditor = () => {
  editors.value.push({ content: "" });
};

const updateContent = (index, newContent) => {
  editors.value[index].content = newContent;
};

const removeEditor = (index) => {
  editors.value.splice(index, 1);
};

const saveEditors = () => {
  savedContents.value = editors.value.map((editor) => {
    console.log("luu", editor.content);
    return editor.content;
  });
};
</script>
