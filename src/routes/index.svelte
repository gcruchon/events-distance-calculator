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
<p>Pour le savoir, entrez le code postal de votre adresse de résidence:</p>
<p>
    <input
        type="text"
        id="start"
        pattern="[0-9]{5}"
        title="Code postal sur 5 chiffres"
        size="5"
        on:keypress={onKeyPress}
        bind:value={start}
        class={error ? 'error' : ''}
    /> (par ex.: 59110)
</p>
{#if error}
    <p class="error">
        Le code postal doit être sur 5 chiffres (y compris s'il commence par un
        zéro)
    </p>
{/if}
<p>
    <button on:click={seeDistances} disabled={loading}>Voir la distance</button>
</p>

<style>
    input.error {
        border-color: #a00;
        background-color: rgb(233, 203, 203);
    }
    p.error {
        color: #a00;
    }
</style>
