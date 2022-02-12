<script>
    import { goto } from '$app/navigation';
    import { isValidPostalCode } from '../utils/postalCode';

    let start = '';
    let error = false;
    let loading = false;

    const seeDistances = () => {
        if (isValidPostalCode(start)) {
            error = false;
            goto(`/distances/${start}`);
        } else {
            error = true;
            document.getElementById('start').focus();
        }
    };
    const onKeyPress = (e) => {
        if (e.charCode === 13) seeDistances();
    };
</script>

<h1>Êtes-vous loin des tournois&nbsp;?</h1>
<div class="alert alert-info mt-3">
    Pour le savoir, entrez le code postal de votre adresse de résidence:
    <input
        type="text"
        id="start"
        pattern="[0-9]{5}"
        title="Code postal sur 5 chiffres"
        size="6"
        maxlength="5"
        on:keypress={onKeyPress}
        bind:value={start}
        class={error ? 'error' : ''}
        aria-describedby="startHelpBlock"
    />
</div>
<div id="startHelpBlock" class="form-text">
    Le code postal doit comporter 5 chiffres. Par exemple : 59110
</div>
{#if error}
    <div class="alert alert-danger" role="alert">
        Le code postal doit être sur 5 chiffres (y compris s'il commence par un
        zéro)
    </div>
{/if}
<div class="my-3">
    <button on:click={seeDistances} disabled={loading} class="btn btn-primary"
        >Voir la distance</button
    >
</div>

<style>
    input.error {
        border-color: #a00;
        background-color: rgb(233, 203, 203);
    }
</style>
