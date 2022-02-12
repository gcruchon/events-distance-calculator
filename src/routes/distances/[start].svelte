<script>
    import { format } from 'date-fns';
    import { goto } from '$app/navigation';

    export let start;
    export let events;

    const changeStart = () => {
        goto('/');
    };

    const toHHMMSS = (duration) => {
        var sec_num = Math.round(duration, 0);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = sec_num - hours * 3600 - minutes * 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    };
    const formatDate = (d) => format(new Date(d), 'dd/MM/yyyy');
    const sortEvent = (event1, event2) => {
        const d1 = event1.distance || 100000;
        const d2 = event2.distance || 100000;
        return d1 - d2;
    };
</script>

<h1>Distance aux tournois</h1>
<p class="alert alert-info mt-3">
    Vous habitez dans la ville: <strong>{start}</strong>
    <button on:click={changeStart} class="mx-3 btn btn-outline-info"
        >Changer de ville</button
    >
</p>

<h2>Liste des événements (du plus près au plus loin)</h2>
{#each events.sort(sortEvent) as event}
    <div class="card my-2">
        <div class="card-body">
            <h5 class="card-title">
                {event.name}
            </h5>
            <div>
                <span class="text-secondary"
                    >du {formatDate(event.dates.start)} au {formatDate(
                        event.dates.end
                    )}</span
                >
            ⛳ <span class="text-success">{event.location.name}</span> 
            </div>
            {#if event.distance}
                <div class="fw-bold mt-2">
                    🚗 Distance : {Math.round(event.distance, 0)} km
                    {#if event.duration}
                    <span class="badge bg-light text-dark">⏳ {toHHMMSS(event.duration)}</span>
                    {/if}
                </div>
            {:else}
            <div class="fst-italic text-muted mt-2">
                Pas d'info de distance
            </div>
            {/if}
        </div>
    </div>
{/each}