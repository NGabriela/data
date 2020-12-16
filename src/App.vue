<template>
    <div class="container">
        <div v-if="loading" class="loading"/>
        <notifications type="error" group="errors"/>
        <notifications @click="close"
                       group="notifications"
                       class="info-notification"
                       position="top left">
            <template slot="body" slot-scope="props">
                <button class="close-btn" @click="close(props.item.title)"><img src="./assets/delete.svg" alt="delete"/>
                </button>
                <div class="notification-container">
                    <p class="title">{{props.item.title}}</p>
                    <div v-html="props.item.text"></div>
                </div>
            </template>
        </notifications>
        <Diagram :json="data" class="diagram-container" :selected="selected" :select="setSelected"/>
    </div>
</template>

<script>
  import Diagram from "@/components/Diagram";
  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      Diagram
    },
    data() {
      return {
        flattenData: [],
        landscape: [],
        data: {},
        error: false,
        loading: false,
        selected: ''
      };
    },
    methods: {
      nest(items, name = '', link = 'parent') {
        return items.filter(item => item[link] === name)
            .map(item => ({
              name: item.name,
              description: item.description,
              class: item.class || '',
              children: this.nest(items, item.name),
            }));
      },
      close: function () {
        this.selected = '';
        this.$notify({group: 'notifications', clean: true});
      },
      setSelected: function (name) {
        this.selected = name;
      }
    },
    mounted() {
      this.loading = true;
      axios.get('https://us-central1-service-e063e.cloudfunctions.net/app')
          .then(response => {
            this.flattenData = response.data;
            const data = this.nest(response.data);
            this.data = {
              name: data[0].name,
              description: data[0].description,
              class: ["rootNode"],
              children: data[0].children
            };
          })
          .catch(() => {
            this.$notify({
              group: 'errors', title: 'Error',
              text: 'An error has occurred and data could not be loaded', type: 'error'
            });
          })
          .finally(() => this.loading = false)
    },
  }
</script>

<style lang="scss">
    .container {
        position: relative;
        .diagram-container{
            position: absolute;
            top:20px;
            left:100px;
        }
        .info-notification {
            body {
                font-family: 'Avenir', Helvetica, Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                padding: 0;
                padding-top: 80px;
                height: 300px;
                margin: 0;

                h2 {
                    font-weight: 300;

                    a {
                        color: black;
                        font-size: 12px;
                    }
                }

                #app {
                    text-align: center;
                    color: #2c3e50;

                    .content {
                        margin: 0 auto;
                    }
                }
            }

            .vue-notification-wrapper {
                min-width: 400px;
                height: 120px;
                background-color: white;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.15);
                border: 1px solid #cccccca1;
                color: #2e776d;
            }

            .notification-container {
                padding: 10px;
            }

            .close-btn {
                background-color: #2e776d;
                position: absolute;
                left: 400px;
                border: none;
                width: 24px;
                height: 24px;
            }

            .title {
                font-size: 20px;
                font-weight: 500;
            }
        }

        position: relative;

        .loading {
            color: #2e776d;
            position: fixed;
            top: 20px;
            left: 50%;
            border: 16px solid #f3f3f3;
            border-top: 16px solid #2e776d;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }

</style>
