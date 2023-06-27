<div class="autocomplete">
    <input type="text" on:input={inputHandler} on:click={onClickHandler} on:keydown={keyPressedHandler} id="autocomplete1"/>
    <AutocompleteTab suggestions={suggestions} />
</div>

<script lang="ts">
import type { AutoComplete } from "./model";
import AutocompleteTab from "./autocompleteTab.svelte";
import { onMount } from "svelte";

export let AutoCompleteData: AutoComplete;
let inputEl: HTMLInputElement | null;
let suggestions: string[] = []
let caretPosition: number = 0;

onMount(() => {
    inputEl = document.getElementById("autocomplete1") as HTMLInputElement | null
})

const inputHandler = (event: Event) => {
    event.preventDefault()
    const text = inputEl?.value ?? "";

    caretPosition = inputEl!.selectionStart!
    suggestions = AutoCompleteData.getSuggestions(text, caretPosition)
}

let keyPressedHandler = (event: KeyboardEvent) => {
    const text = inputEl?.value ?? "";
    caretPosition = inputEl!.selectionStart!

    AutoCompleteData.onInputHandler(text, caretPosition, event.key)
    suggestions = AutoCompleteData.getSuggestions(text, caretPosition)
}

const onClickHandler = () => {
    const text = inputEl?.value ?? "";
    AutoCompleteData.calcSuggestions(text, inputEl!.selectionStart)
    suggestions = AutoCompleteData.getSuggestions()
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