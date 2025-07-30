import { useEffect } from "react";
import { Howl } from "howler";

// Puedes cambiar las URLs por sonidos libres de derechos
const sounds = {
  click: "https://cdn.pixabay.com/audio/2022/10/16/audio_12c6c8b6c0.mp3",
  upgrade: "https://cdn.pixabay.com/audio/2022/10/16/audio_12c6c8b6c0.mp3",
  achievement: "https://cdn.pixabay.com/audio/2022/10/16/audio_12c6c8b6c0.mp3",
};

export default function SoundPlayer({ type, onPlayed }) {
  useEffect(() => {
    if (!type || !sounds[type]) return;
    const sound = new Howl({ src: [sounds[type]], volume: 0.4 });
    sound.play();
    if (onPlayed) setTimeout(onPlayed, 700);
    // eslint-disable-next-line
  }, [type]);
  return null;
}