<template>
  <section class="content">
    <!-- <page-title
      heading="Seu perfil"
      subheading="Matenha sempre seus dados pessoais atualizados."
      icon="pe-7s-graph text-success"
    ></page-title> -->
    <div class="card mb-3">
      <div class="no-gutters row">
        <b-col md="12">
          <div class="header-content">
            <div class="avatar-content">
              <input
                type="file"
                class="hide"
                id="profile_picture"
                @change="onPictureSelected"
              />
              <label for="profile_picture" class="user-avatar">
                <img
                  v-if="user.picture"
                  class="rounded-circle"
                  :src="
                    user.picture
                      ? user.picture
                      : '@/assets/images/avatars/user-circle-solid.svg'
                  "
                />
                <img
                  v-else
                  class="rounded-circle"
                  src="@/assets/images/avatars/user-circle-solid.svg"
                />
                <span></span>
              </label>
            </div>
            <div class="info-content-header">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
              <p>{{ user.cpf ? user.cpf : "CPF: --" }}</p>
            </div>
          </div>

          <button class="btn btn-link edit-perfil" v-b-modal.modal-edit-user>
            <i class="pe-7s-pen text-info fa-2x" />
          </button>
        </b-col>
      </div>
      <div class="row">
        <b-col md="12">
          <b-card class="mb-3 nav-justified" no-body>
            <b-tabs pills card>
              <b-tab title="Seus dados" active>
                <div class="row"></div>
                <div class="row">
                  <b-col md="6" class="details-grid">
                    <strong>Nome</strong>
                    <strong>:</strong>
                    <p>{{ user.name }}</p>
                  </b-col>
                </div>
              </b-tab>
              <b-tab title="Outras informações">
                <p>
                  Like Aldus PageMaker including versions of Lorem. It has
                  survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged.
                </p>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </div>
    </div>
    <ModalEditUser :user="user" />
  </section>
</template>

<script>
import PageTitle from "@/Layout/Components/PageTitle.vue";
import ModalEditUser from "../components/ModalEditUser";
import { mapState } from "vuex";
import { api } from "@/services/api";

export default {
  name: "Profile",
  data() {
    return {
      picture: null
    };
  },
  components: {
    PageTitle,
    ModalEditUser
  },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    async onPictureSelected(event) {
      this.picture = event.target.files[0];

      const fd = new FormData();
      fd.append("image", this.picture, this.picture.name);
      await api.put(`user/image/${this.user.id}`, fd, {
        onUploadProgress: uploadEvent => {
          console.log(
            "Salvando imagem: " +
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
              "%"
          );
        }
      });
      console.log("f", this.picture);
    }
  }
};
</script>

<style lang="scss" scoped>
.header-content {
  display: flex;
  flex-direction: row;
  padding: 20px;
}
.avatar-content {
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
}

.edit-perfil {
  position: absolute;
  right: 20px;
  top: 20px;
}

.user-avatar {
  margin-right: 20px;
  display: flex;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  color: #fff;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    content: "Alterar foto";
    cursor: pointer;
    opacity: 0.7;
  }
}

#profile_picture {
  display: none;
}
</style>
