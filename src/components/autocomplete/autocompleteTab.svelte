
<div class="autocomplete-tabs">
    {#each suggestions as suggestion}
    <div class="autocomplete-tab">
        <p>{suggestion} </p>
    </div>
    {/each}
</div>  


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
    background-color: rgb(213, 215, 216);
}

.autocomplete-tabs p {
    margin: 10px;
}
</style>