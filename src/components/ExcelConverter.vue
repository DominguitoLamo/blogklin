<script setup lang="ts">
import { ref } from 'vue'
import UploadFile from './UploadFile.vue'
import { read as xlsxRead, utils as xlsxUtils } from 'xlsx'
// @ts-ignore
import json2md from 'json2md'

interface ExcelData {
  name: string,
  data: Array<unknown>
}

const uploadedFile = ref()
const resultText = ref('')

function handleUploadChange(file: File) {
  uploadedFile.value = file
}

function gen2Json() {
  if (!uploadedFile.value) {
    alert('No file uploaded')
  }

  getExcelData((excel) => {
      // convert to string
      const strResult = excel.reduce((result, item) => {
        const jsonStr = item.data.reduce((subResult, subItem) => {
          return subResult + `${JSON.stringify(subItem)}\n`
        }, "")
        return result +  `${item.name}\n${jsonStr}\n`
      }, "")
      resultText.value = strResult
  })
}

function gen2Md() {
  if (!uploadedFile.value) {
    alert('No file uploaded')
  }

  getExcelData(excelData => {
    const mdArr: Array<any> = []
    excelData.forEach((item) => {
      mdArr.push(
        {
        h2: item.name ?? "null"
      })
      if (item.data && item.data.length > 0) {
        mdArr.push({
          table: {
            headers: [...Object.keys(item.data[0] as any)],
            // @ts-ignore
            rows: [...item.data.map(subItem => Object.values(subItem))]
          }
        })
      }
    })

    resultText.value = json2md(mdArr)
  })
}

function getExcelData(callback: (data: Array<ExcelData>) => void) {
  // load data
  const fileLoaded = uploadedFile.value
  const reader = new FileReader()
  reader.readAsBinaryString(fileLoaded)
  reader.onload = (e: any) => {
    const loaded = e.target.result
    const excelData = xlsxRead(loaded, {
      type: 'binary'
    })

    const result = excelData.SheetNames.map(sheetName => {
      return {
        name: sheetName,
        data: xlsxUtils.sheet_to_json(excelData.Sheets[sheetName])
      }
    }) as Array<ExcelData>
    callback(result)
  }
}

</script>
<template>
  <div class="converter">
    <div class="upload-box">
      <div class="upload">
        <UploadFile @change="handleUploadChange" file-type="xlsx" />
      </div>
      <div class="buttons">
        <button @click="gen2Json" class="normal-button json-btn">To Json</button>
        <button @click="gen2Md" class="normal-button md-btn">To Md</button>
      </div>
      <div class="preview">
        <textarea v-model="resultText"></textarea>
      </div>
    </div>
  </div>
</template>
<style scoped>
.upload-box {
  padding-left: 14px;
}

.upload {
  margin-bottom: 14px;
}

.buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
  padding-left: 10px;
}

.normal-button.json-btn {
  background: rgb(6,14,131);
  background: linear-gradient(0deg, rgba(6,14,131,1) 0%, rgba(12,25,180,1) 100%);
  border: none;
}

.normal-button.json-btn:hover {
  background: rgb(0,3,255);
  background: linear-gradient(0deg, rgba(0,3,255,1) 0%, rgba(2,126,251,1) 100%);
}

.normal-button.md-btn {
  background: rgba(251,33,117,1);
  background: linear-gradient(0deg, rgba(251,33,117,1) 0%, rgba(234,76,137,1) 100%);
  border: none;
}

.normal-button.md-btn:hover {
  background: rgb(238, 94, 149);
  background: linear-gradient(0deg, rgb(238, 94, 149) 0%, rgba(234,76,137,1) 100%);
  border: none;
}

textarea {
  width: 970px;
  height: 300px;
}
</style>

