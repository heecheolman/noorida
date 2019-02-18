<template>
  <div>
    <toolbar :title="'기사 작성중'"/>
    <input class="input-title"
           type="text"
           :value="title"
           @input="setTitle($event.target.value)"
           placeholder="제목">

    <quill-editor ref="editor"
                  :value="content"
                  @input="setContent($event)"
                  :options="editorOption">
    </quill-editor>

    <div class="flex-container flex-center-sort">
      <a-button type="primary"
                :disabled="!title || !content"
                @click="uploadPost()">기사작성</a-button>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import { quillEditor } from 'vue-quill-editor';
import Toolbar from '@/components/Toolbar';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'WritePage',
  components: {
    quillEditor,
    Toolbar,
  },
  computed: {
    ...mapState('post', {
      title: state => state.title,
      content: state => state.content,
    }),
  },
  data() {
    return {
      editorOption: {
        placeholder: '내용',
        modules: {
          toolbar: {
            container: [
              [{ size: ['small', false, 'large'] }],
              ['bold', 'italic'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['blockquote'],
              [{ align: [] }],
              ['link', 'image','video'],
            ],
            handlers: {
              image: this.imageUploadHandler,
            },
          },
        },
        theme: 'snow',
      },
    };
  },
  methods: {
    ...mapMutations('post', {
      setTitle: 'SET_TITLE',
      setContent: 'SET_CONTENT',
    }),
    uploadPost() {
      /**
       * 1. userNo 과 address 를 가져옴
       * 2. 'ㅇㅇ구' 를 뽑아냄
       * 3. userNo 과 address 를 보내줌
       */
      const userNo = this.$store.state.login.user.userNo;
      const fullAddress = this.$store.state.login.address;
      const address = fullAddress.split(' ')[2];
      this.$store.dispatch('post/uploadProcess', { userNo, address });
    },
    imageUploadHandler() {
      // TODO
      // * 이미지 선택후 ok 하면 서버에 먼저 올라가고 해당 이미지를 가져오는데, 이렇게되면 이미지를 사용하고 싶지 않았을 때 문제가 됨
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('name', 'post');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.onchange = async () => {
        const file = input.files[0];
        if (/^image\//.test(file.type)) {
          const formData = new FormData();
          formData.append('image', file);
          const filename = await this.$api.uploadImage(formData)
            .then(result => result.data)
            .catch(err => err);
          const range = this.$refs.editor.quill.getSelection();
          this.$refs.editor.quill.insertEmbed(range.index, 'image', `http://localhost:3000/images/${filename}`);
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './../assets/scss/mixin/typography';

  .input-title {
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border: none;
    outline: none;
    @include font-size-large;
  }
</style>
