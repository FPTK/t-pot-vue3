<template>
  <div class="icon-theme">
    <theme
        title="切换皮肤"
        size="18"
        @click="handleOpenDrawer"></theme>
  </div>
  <el-drawer
      title="主题设置"
      v-model="settings.isDrawerSetting"
      :size="320"
      :show-close="false"
      destroy-on-close
  >
    <el-form label-width="100px" label-position="left">
      <el-form-item label="主题">
        <el-select v-model="select" size="small" placeholder="请选择" @change="handleChangeTheme">
          <el-option
              v-for="(item,index) in setting.colorOptions"
              :key="index"
              :label="item.label"
              :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
      <template #footer>
        <el-divider/>
        <el-button type="primary" @click="handleSaveTheme">保存</el-button>
      </template>
  </el-drawer>
</template>

<script>
import {useStore} from 'vuex'
import {themeConfig} from "@/config/theme";
import {computed, reactive, watch,ref} from "vue";

export default {
  name: "changeColor",
  setup() {
    const store = useStore()

    //定义的初始颜色
    const ORIGINAL_THEME = '#409EFF'

    const {colorOptions} = themeConfig

    //下拉框选择的颜色
    const select_color = ref()

    //下拉框的颜色配置
    const setting = reactive({
      colorOptions: [
        {
          value: 'theme1',
          label: '蓝白'
        },
        {
          value: 'theme2',
          label: '蓝黑'
        },
        {
          value: 'theme3',
          label: '绿白'
        },
        {
          value: 'theme4',
          label: '绿黑'
        },
        {
          value: 'theme5',
          label: '红白'
        },
        {
          value: 'theme6',
          label: '红黑'
        },
      ]
    })

    //下拉框绑定的v-model
    const select = ref()

    //获取此时setting的计算属性
    const settings = computed(() => {
      return store.getters['setting/settings']
    })

    //打开主题设置抽屉
    const handleOpenDrawer = () => {
      store.commit('setting/change_setting_drawer', true)
    }

    //处理更换主题
    const handleChangeTheme = (val) => {
      //此处的value为下拉选择器中定义的value
      // console.log(val)
      select_color.value = val
    }

    //保存主题颜色
    const handleSaveTheme = () => {
      store.commit('setting/set_theme', select_color.value)
      store.commit('setting/change_setting_drawer', false)
    }

    const getThemeCluster = (theme) => {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        if (tint === 0) {
          return [red, green, blue].join(',');
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));
          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);
          return `#${red}${green}${blue}`;
        }
      };
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        return `#${red}${green}${blue}`;
      };
      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    };

    const updateStyle = (style, oldCluster, newCluster) => {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
      });
      return newStyle;
    };

    const getCSSString = (url, variable) => {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            setting[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
            resolve();
          }
        };
        xhr.open('GET', url);
        xhr.send();
      });
    };

    watch(
        () => settings.value.theme,
        async (theme) => {
          const val = colorOptions[theme].primary;

          const oldVal = setting.chalk ? settings.value.theme : ORIGINAL_THEME;
          console.log(val, oldVal);
          if (typeof val !== 'string') return;
          const themeCluster = getThemeCluster(val.replace('#', ''));
          const originalCluster = getThemeCluster(oldVal.replace('#', ''));
          const getHandler = (variable, id) => {
            return () => {
              const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''));
              const newStyle = updateStyle(setting[variable], originalCluster, themeCluster);
              let styleTag = document.getElementById(id);
              if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.setAttribute('id', id);
                document.head.appendChild(styleTag);
              }
              styleTag.innerText = newStyle;
            };
          };
          if (!setting.chalk) {
            const url = `https://cdn.jsdelivr.net/npm/element-plus@2.1.8/dist/index.css`;
            await getCSSString(url, 'chalk');
          }
          const chalkHandler = getHandler('chalk', 'chalk-style');
          chalkHandler();
          const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
            const text = style.innerText;

            return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
          });
          styles.forEach((style) => {
            const {innerText} = style;
            if (typeof innerText !== 'string') return;
            style.innerText = updateStyle(innerText, originalCluster, themeCluster);
          });
        },
        {
          immediate: true,
        }
    );
    return {
      handleOpenDrawer,
      handleChangeTheme,
      handleSaveTheme,
      settings,
      setting,
      select
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-theme {
  padding-right: 10px;
}
</style>