
<div class="autocomplete-tabs">
    {#each renderedSuggestions as suggestion}
    <div class="autocomplete-tab">
        <p>{suggestion} </p>
    </div>
    {/each}
</div>  


<script lang="ts">
import { findTextAtCaret } from "../utils";  
export let suggestions: string[]
export let input: string
export let caretPosition: number
let renderedSuggestions: string[] = []


$: {
    let textAtCaret = findTextAtCaret(input, caretPosition)
    renderedSuggestions = suggestions.filter(str => str.startsWith(textAtCaret) && textAtCaret.length <= str.length)
}

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
    background-color: rgb(213, 215, 216);
}

.autocomplete-tabs p {
    margin: 10px;
}
</style>