<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Autocomplete AutoCompleteData={demoData} />
<button class="btn" on:click={clickHandler}>Add Data</button>
<button on:click={addDatatoMapper}>Add Data to mapper2</button>


<script lang="ts">
import Autocomplete from "../components/autocomplete/autocomplete.svelte";
import { AutoComplete } from "../components/autocomplete/model";
import {readMapperFunction, mapperFunction, readDataFunction} from "../demoData"
import type { AutoCompFragment } from "../components/autocomplete/model";

const demoData = new AutoComplete([], []);

export let mapperFunction2: AutoCompFragment = {
    name: "mapper2",
    isFunction: true,
    parameters: [
        {
            name: "arg1",
            type: "string",
            arguments: ["ReadMapper", "ReadData"]
        },
        {
            name: "arg2",
            type: "string",
            arguments: ["ReadMapper", "ReadData"]
        },
    ]
}

const addDatatoMapper = () => {
	mapperFunction2.parameters[0].arguments.push("ReadColumn")
	demoData.setData([readDataFunction, readMapperFunction, mapperFunction, mapperFunction2], [mapperFunction]);
}

const clickHandler = () => {
	demoData.setData([readDataFunction, readMapperFunction, mapperFunction, mapperFunction2], [mapperFunction]);
};

</script>




<style>
.btn {
	margin-top: 100px;
}
</style>