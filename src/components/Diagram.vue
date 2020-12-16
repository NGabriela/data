<template>
    <table class="diagram" v-if="data.name">
        <tr>
            <td class="diagram-cell" :colspan="Array.isArray(data.children) ? data.children.length * 2 : 1"
                :class="{parentLevel: Array.isArray(data.children) && data.children.length,
                    extend: Array.isArray(data.children) && data.children.length && data.extend}">
                <div :class="{node: true, 'selected': selectedObj === data.name}">
                    <div class="diagram-item"
                         :class="Array.isArray(data.class) ? data.class : []"
                         @click="clickNode(data)">
                        <div class="name">{{data.name}}</div>
                    </div>
                </div>
                <div class="extend_handle" v-if="Array.isArray(data.children) && data.children.length"
                     @click="toggleExtend(data)"></div>
            </td>
        </tr>
        <tr v-if="Array.isArray(data.children) && data.children.length && data.extend">
            <td :class="['level', 'diagram-cell'] "
                v-for="(children, index) in data.children"
                :key="index"
                colspan="2">
                <Diagram :json="children" :selected="selectedObj" :select="select"/>
            </td>
        </tr>
    </table>
</template>

<script>
  export default {
    name: "Diagram",
    props: ["json", "selected", "select"],
    data() {
      return {
        data: {},
        selectedObj: '',
      }
    },
    watch: {
      selected: {
        handler: function (Props) {
          this.selectedObj = Props;
        }
      },
      select: {
        handler: function (Props) {
          this.select = Props;
        }
      },
      json: {
        handler: function (Props) {
          let extendKey = function (jsonData) {
            jsonData.extend = (jsonData.extend === undefined ? true : !!jsonData.extend);

            if (Array.isArray(jsonData.children)) {
              jsonData.children.forEach(c => {
                extendKey(c);
              })
            }
            return jsonData;
          };

          if (Props) {
            this.data = extendKey(Props);
          }

        },
        immediate: true
      },
    },
    methods: {
      toggleExtend: function (data) {
        data.extend = !data.extend;
        this.$forceUpdate();
      },
      clickNode: function (data) {
        this.select(data.name);
        this.$notify({group: 'notifications', clean: true});
        this.$notify({
          group: 'notifications',
          title: data.name,
          text: data.description,
        });
      },

    }
  }
</script>

<style lang="scss">
    //node style
    .diagram {
        border-collapse: separate !important;
        border-spacing: 0 !important;
        .diagram-cell {
            position: relative;
            vertical-align: top;
            padding: 0 0 50px 0;
            text-align: center;

            .node {
                cursor: pointer;
                position: relative;
                display: inline-block;
                margin: 0 1em;
                box-sizing: border-box;
                text-align: center;
                border-radius: 0 10px;
                border: #cccccc 1px solid;

                .diagram-item {
                    width: 200px;
                    height: 100px;

                    .name {
                        padding: 16px;
                    }
                }
            }

            .selected {
                border: #2e776d 1px solid;
            }

            .extend_handle {
                position: absolute;
                left: 50%;
                bottom: 30px;
                width: 10px;
                height: 10px;
                padding: 10px;
                transform: translate3d(-15px, 0, 0);
                cursor: pointer;

                &:before {
                    content: "";
                    display: block;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    border: 2px solid;
                    border-color: #ccc #ccc transparent transparent;
                    transform: rotateZ(135deg);
                    transform-origin: 50% 50% 0;
                    transition: transform ease 300ms;
                }

                &:hover:before {
                    border-color: #333 #333 transparent transparent;
                }
            }

            .extend .extend_handle:before {
                transform: rotateZ(-45deg);
            }

            .extend::after {
                content: "";
                position: absolute;
                left: 50%;
                bottom: 15px;
                height: 15px;
                border-left: 2px solid #ccc;
                transform: translate3d(-1px, 0, 0)
            }

        }
    }

    //connective lines style
    .level {
        &::before {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 100%;
            height: 15px;
            border-left: 2px solid #ccc;
            transform: translate3d(-1px, 0, 0)
        }

        &::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: -15px;
            border-top: 2px solid #ccc;
        }

        &:first-child:before, .level:last-child:before {
            display: none;
        }

        &:first-child:after {
            left: 50%;
            height: 15px;
            border: 2px solid;
            border-color: #ccc transparent transparent #ccc;
            border-radius: 6px 0 0 0;
            transform: translate3d(1px, 0, 0)
        }

        &:last-child:after {
            right: 50%;
            height: 15px;
            border: 2px solid;
            border-color: #ccc #ccc transparent transparent;
            border-radius: 0 6px 0 0;
            transform: translate3d(-1px, 0, 0)
        }

        &:first-child.level:last-child::after {
            left: auto;
            border-radius: 0;
            border-color: transparent #ccc transparent transparent;
            transform: translate3d(1px, 0, 0)
        }
    }
</style>

