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
<p>
    Vous habitez dans la ville: <strong>{start}</strong>
    <button on:click={changeStart}>Changer de ville</button>
</p>

<h2>Liste des événements (du plus près au plus loin)</h2>
{#each events.sort(sortEvent) as event}
    <div class="event">
        <div class="title">
            {event.name}
        </div>
        <div>
            <span class="dates"
                >{formatDate(event.dates.start)} - {formatDate(
                    event.dates.end
                )}</span
            >
            - Golf: {event.location.name}
        </div>
        {#if event.distance}
            <div class="distance">
                Distance : {Math.round(event.distance, 0)} km
                {#if event.duration}
                    ({toHHMMSS(event.duration)})
                {/if}
            </div>
        {/if}
    </div>
{/each}

<style>
    .event {
        margin-bottom: 1em;
    }
    .title {
        font-weight: bold;
    }
    .dates {
        font-style: italic;
    }
</style>
