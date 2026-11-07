
const songs = [
    {
        title: "Acoustic Breeze",
        artist: "Benjamin Tissot",
        album: "Acoustic Sessions",
        duration: "",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=85",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Night Drive",
        artist: "SoundHelix",
        album: "Late Night Beats",
        duration: "",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=85",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Guitar Dreams",
        artist: "SoundHelix",
        album: "Guitar Moments",
        duration: "",
        cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=85",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        title: "Feel Good",
        artist: "SoundHelix",
        album: "Feel Good",
        duration: "",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=85",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        title: "Deep Focus",
        artist: "SoundHelix",
        album: "Focus Flow",
        duration: "",
        cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500&q=85",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        title: "Summer Vibes",
        artist: "SoundHelix",
        album: "Sunset Mix",
        duration: "",
        cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=85",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        title: "Piano Reflections",
        artist: "SoundHelix",
        album: "Calm Piano",
        duration: "",
        cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&q=85",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        title: "Midnight City",
        artist: "SoundHelix",
        album: "City Lights",
        duration: "",
        cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500&q=85",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
];


const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

let current = 0,
    playing = false,
    shuffle = false,
    repeat = false;


const $ = id => document.getElementById(id);


function time(s) {
    if (!Number.isFinite(s)) return "0:00";

    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}


function render(list = songs) {

    $("musicGrid").innerHTML = list.slice(0, 5).map(song => {
        let i = songs.indexOf(song);

        return `
            <article class="music-card" data-index="${i}">
                <div class="cover-wrap">
                    <img src="${song.cover}" alt="">
                    <button class="card-play" data-play="${i}">▶</button>
                </div>

                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </article>
        `;
    }).join("");


    $("trackRows").innerHTML = list.map((song, n) => {
        let i = songs.indexOf(song);

        return `
            <div class="track-row" data-index="${i}">
                <span>${String(n + 1).padStart(2, "0")}</span>

                <div class="track-name">
                    <img src="${song.cover}" alt="">

                    <div>
                        <b>${song.title}</b>
                        <small>${song.artist}</small>
                    </div>
                </div>

                <span>${song.album}</span>

                <span class="duration">${song.duration || "—"}</span>
            </div>
        `;
    }).join("");


    $("trackCount").textContent = `${list.length} songs`;
}


function loadSong(index, autoplay = true) {

    current = (index + songs.length) % songs.length;

    const s = songs[current];

    audio.src = s.src;

    $("currentCover").src = s.cover;
    $("currentTitle").textContent = s.title;
    $("currentArtist").textContent = s.artist;

    $("likeBtn").textContent = "♡";

    document.querySelectorAll(".track-row").forEach(r => {
        r.classList.toggle("selected", Number(r.dataset.index) === current);
    });

    if (autoplay) {
        playSong();
    } else {
        playing = false;
        playBtn.textContent = "▶";
    }
}


function playSong() {

    audio.play().then(() => {

        playing = true;
        playBtn.textContent = "Ⅱ";

    }).catch(() => {

        playing = false;
        playBtn.textContent = "▶";

        alert("Audio load nahi hua. Internet connection check karein aur dobara Play dabayein.");
    });
}


function togglePlay() {

    if (!audio.src) loadSong(0, false);

    if (playing) {

        audio.pause();
        playing = false;
        playBtn.textContent = "▶";

    } else {

        playSong();
    }
}


function next() {

    let n = shuffle
        ? Math.floor(Math.random() * songs.length)
        : current + 1;

    loadSong(n);
}


function previous() {

    if (audio.currentTime > 3) {

        audio.currentTime = 0;

    } else {

        loadSong(current - 1);
    }
}


render();


playBtn.addEventListener("click", togglePlay);

$("nextBtn").addEventListener("click", next);
$("prevBtn").addEventListener("click", previous);


$("shuffleBtn").addEventListener("click", () => {

    shuffle = !shuffle;

    $("shuffleBtn").style.color = shuffle ? "#1ed760" : "#aaa";
});


$("repeatBtn").addEventListener("click", () => {

    repeat = !repeat;

    $("repeatBtn").style.color = repeat ? "#1ed760" : "#aaa";
});


$("likeBtn").addEventListener("click", e => {

    e.currentTarget.textContent =
        e.currentTarget.textContent === "♡" ? "♥" : "♡";
});


$("volume").addEventListener("input", e => {

    audio.volume = e.target.value;
});

audio.volume = .7;


document.addEventListener("click", e => {

    let p = e.target.closest("[data-play]");

    if (p) {

        loadSong(Number(p.dataset.play));

        return;
    }

    let row = e.target.closest(".track-row[data-index]");

    if (row) loadSong(Number(row.dataset.index));

    let card = e.target.closest(".music-card[data-index]");

    if (card && !p) loadSong(Number(card.dataset.index));
});


audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        progress.value = audio.currentTime / audio.duration * 100;

        $("currentTime").textContent = time(audio.currentTime);

        $("duration").textContent = time(audio.duration);
    }
});


progress.addEventListener("input", () => {

    if (audio.duration) {
        audio.currentTime = progress.value / 100 * audio.duration;
    }
});


audio.addEventListener("ended", () => {

    if (repeat) {

        audio.currentTime = 0;

        playSong();

    } else {

        next();
    }
});


$("searchInput").addEventListener("input", e => {

    let q = e.target.value.toLowerCase();

    render(
        songs.filter(s =>
            (s.title + " " + s.artist + " " + s.album)
                .toLowerCase()
                .includes(q)
        )
    );
});


$("newPlaylist").addEventListener("click", () => {

    let name = prompt("Playlist ka naam likhein:");

    if (name && name.trim()) {

        let b = document.createElement("button");

        b.className = "playlist-item";
        b.textContent = name.trim();

        $("playlistList").appendChild(b);
    }
});


document.querySelectorAll(".playlist-item").forEach(b => {

    b.addEventListener("click", () => {

        document.querySelectorAll(".playlist-item").forEach(x => {
            x.style.color = "#aaa";
        });

        b.style.color = "#1ed760";
    });
});
