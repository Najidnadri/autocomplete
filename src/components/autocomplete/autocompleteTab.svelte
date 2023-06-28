
<div class="autocomplete-tabs">
    {#each suggestions as suggestion, index}
    <div class="autocomplete-tab" >
        <p>{suggestion} </p>
    </div>
    {/each}
</div>  


<script lang="ts" context="module"> 
let highlightedIndex: number = 0

export function moveUp() {
    // console.log("here")
    // highlightedIndex += 1
    // console.log(highlightedIndex)
}

export function moveDown() {
    // if (highlightedIndex > 0) {
    //     highlightedIndex--
    // }
}

export function resetHighlight() {
    highlightedIndex = 0
}
</script>

<script lang="ts">
export let suggestions: string[]
</script>


<style>
.autocomplete-tabs {
    bottom: -100%;
    left:0;
    right: 0;
    width: 100%;
}

.autocomplete-tab {
    background-color: rgb(233, 235, 237);
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer
}

.autocomplete-tab:hover {
    background-color: rgb(230, 231, 232);
}

.highlight {
    background-color: rgb(213, 215, 216);
}

.autocomplete-tabs p {
    margin: 10px;
}
</style>