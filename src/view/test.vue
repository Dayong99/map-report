<template>
  <div>
    <div>
      <div>
        <el-input
          size="small"
          class="addPosInput"
          style="width: 300px;margin-right: 8px"
          placeholder="添加职位..."
          prefix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          v-model="pos.name">
        </el-input>
        <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
      </div>
      <div class="posManaMain">
        <el-table
          :data="positions"
          border
          size="small"
          stripe
          style="width: 70%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="职位名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PosMana",
    data() {
      return {
        pos: {
          name: ''
        },
        positions: []
      }
    },
    mounted() {
      this.initPositions();
    },
    methods: {
      addPosition() {
        if (this.pos.name) {
          this.postRequest("/system/basic/pos/",this.pos).then(resp=>{
            if (resp) {
              this.initPositions();
            }
          })
        }else {
          this.$message({
            showClose: true,
            message: '职位名称不可以为空',
            type: 'error'
          });
        }
      },
      handleEdit(index,data) {

      },
      handleDelete(index,data) {

      },
      async initPositions() {
        const { data : resp } = await this.getRequest("/system/basic/pos/").then(resp=>{
          if (resp) {
            this.positions = resp;
          }
        })
      }
    }
  }
</script>

<style>

  .addPosInput {
    width: 300px;
    margin-right: 8px;
  }

  .posManaMain {
    margin-top: 10px;
  }

</style>
