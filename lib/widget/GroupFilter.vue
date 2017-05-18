<template>
    <div class="groupFilter">
        <div v-for="(rowList, rowIndex) in data" class="row tagRow"
             v-show="!toggleMode || showAll || rowIndex == 0">
            <div v-for="(item, colIndex) in rowList"
                 @click="selectItem(rowIndex, colIndex)"
                 class="tagItem col-center"
                 :class="{selectedState: selectedIndex[rowIndex] == colIndex}">
                {{item}}
            </div>
            <span class="col"></span>
            <i :class="[showAll ? 'icon-angle-up' : 'icon-angle-down']"
               class="col-center toggleBtn"
               v-if="toggleMode && rowIndex == 0"
               @click="toggleShowAll"></i>
        </div>
    </div>
</template>
<style scoped>
    .toggleBtn {
        padding: 4px 10px;
    }

    .selectedState {
        background-color: #D1EEFF;
        border-radius: 2px;
    }

    .tagItem {
        padding: 4px;
        font-size: 14px;
        color: #37AEFF;
        margin-right: 27px;
        white-space: nowrap;
    }

    .tagRow {
        padding: 5px 10px;
    }


    .tagItem:last-child {
        margin-right: 0;
    }

    .groupFilter {
        padding: 5px;
        background-color: white;
        width: 100%;
    }
</style>
<script>
    export default{
        props: {
            data: Array,
            selectedIndex: Array,
            toggleMode: false,
        },
        data() {
            return {
                showAll: false
            }
        },
        components: {},
        methods: {
            selectItem(rowIndex, colIndex) {
                if (this.selectedIndex[rowIndex] == colIndex) {
                    return
                }
                this.$set(this.selectedIndex, rowIndex, colIndex)
                this.$emit('onFilterChange', [rowIndex, colIndex])
            },
            toggleShowAll() {
                this.showAll = !this.showAll
                this.$nextTick(() => {
                    this.$emit('toggleShowAll')
                })
            }
        },
    }

</script>
