<div class="autocomplete">
    <input type="text" on:input={inputHandler} on:click={onClickHandler} on:keydown={keyPressedHandler} id="autocomplete1"/>
    <AutocompleteTab suggestions={suggestions} input={input} caretPosition={caretPosition} />
</div>

<script lang="ts">
import {readMapperFunction, mapperFunction, readDataFunction} from "./demoData"
import { AutoComplete } from "./model";
import AutocompleteTab from "./atom/autocompleteTab.svelte";
import { onMount } from "svelte";

const AutoCompleteData = new AutoComplete([readMapperFunction, mapperFunction, readDataFunction], [mapperFunction])
let inputEl: HTMLInputElement | null;
let suggestions: string[] = [];
let input: string = "";
let caretPosition: number = 0;

onMount(() => {
    inputEl = document.getElementById("autocomplete1") as HTMLInputElement | null
})

const inputHandler = (event: Event) => {
    event.preventDefault()
    input = inputEl?.value ?? "";

    caretPosition = inputEl!.selectionStart!
}

let keyPressedHandler = (event: KeyboardEvent) => {
    const text = inputEl?.value ?? "";
    caretPosition = inputEl!.selectionStart!

    let suggs = AutoCompleteData.onInputHandler(text, caretPosition, event.key)
    if (suggs) {
        suggestions = suggs
    }
}

const onClickHandler = () => {
    const text = inputEl?.value ?? "";
    const suggs = AutoCompleteData.calcSuggestions(text, inputEl!.selectionStart)
    if (suggs) {
        suggestions = suggs
    }
}

</script>




<style>
.autocomplete {
    position: relative;
    width: 500px
}

.autocomplete input {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    font-size: 16px;
}
</style>