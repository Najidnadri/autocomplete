<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Autocomplete AutoCompleteData={demoData} />
<button class="btn" on:click={clickHandler}>Add Data</button>


<script>
import Autocomplete from "../components/autocomplete/autocomplete.svelte";
import { AutoComplete } from "../components/autocomplete/model";
import {readMapperFunction, mapperFunction, readDataFunction} from "../demoData"


const demoData = new AutoComplete([], []);

const clickHandler = () => {
	demoData.setData([readDataFunction, readMapperFunction, mapperFunction], [mapperFunction]);
};

</script>




<style>
.btn {
	margin-top: 100px;
}
</style>