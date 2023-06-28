<div class="autocomplete">
    <input type="text" 
        on:focus={e => setShowSuggestions(true)} 
        on:focusout={e => setShowSuggestions(false)} 
        on:input={inputHandler} 
        on:click={onClickHandler} 
        on:keydown={keyPressedHandler} 
        bind:this={inputEl}
    />
    {#if showSuggestions}
        <AutocompleteTab suggestions={suggestions} />
    {/if}
    
</div>

<script lang="ts">
import type { AutoComplete } from "./model";
import AutocompleteTab from "./autocompleteTab.svelte";
import { moveUp, moveDown } from "./autocompleteTab.svelte"

export let AutoCompleteData: AutoComplete;
let inputEl: HTMLInputElement | null;
let suggestions: string[] = []
let caretPosition: number = 0;
let showSuggestions: boolean = false

const inputHandler = (event: Event) => {
    event.preventDefault()
    const text = inputEl?.value ?? "";

    caretPosition = inputEl!.selectionStart!
    suggestions = AutoCompleteData.getSuggestions(text, caretPosition)
}

let keyPressedHandler = (event: KeyboardEvent) => {
    const text = inputEl?.value ?? "";
    caretPosition = inputEl!.selectionStart!

    if (event.ctrlKey && event.code === "Space") {
        event.preventDefault()
        showSuggestions = !showSuggestions
    } else if (event.code === "ArrowUp") {
        event.preventDefault()
        moveUp()
    } else if (event.code === "ArrowDown") {
        event.preventDefault()
        moveDown()
    } else {
        AutoCompleteData.onInputHandler(text, caretPosition, event.key)
        suggestions = AutoCompleteData.getSuggestions(text, caretPosition)
    }

}

const onClickHandler = () => {
    const text = inputEl?.value ?? "";
    AutoCompleteData.calcSuggestions(text, inputEl!.selectionStart)
    suggestions = AutoCompleteData.getSuggestions()
}

const setShowSuggestions = (val: boolean) => {
    if (val === false) {
        suggestions = []
    }
    showSuggestions = val
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