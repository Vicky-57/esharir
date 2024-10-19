import { faDownload, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

const Modal = ({ shloka, bookId, chapterId, onClose }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState('');

  const audioApiUrl = `http://127.0.0.1:8000/api/books/${bookId}/chapters/${chapterId}/shlokas/${shloka.id}/play-audio/`;

  const fetchAudio = async () => {
    try {
      const response = await fetch(audioApiUrl);
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  useEffect(() => {
    fetchAudio();
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioApiUrl]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (audioRef.current.duration / 100) * e.target.value;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const updateProgress = () => {
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-2/3 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Shloka {shloka.shloka_number}</h2>
        <p className="mb-4 ">{shloka.shlok_text}</p>

        {audioUrl && (
          <div className="mt-4">
            <audio ref={audioRef} src={audioUrl} onTimeUpdate={updateProgress} />

            {/* Progress Bar */}
            <div className="flex items-center mt-4 mb-4">
              <span className="text-sm mr-2">{Math.floor((audioRef.current?.currentTime || 0) / 60)}:{('0' + Math.floor((audioRef.current?.currentTime || 0) % 60)).slice(-2)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-300 rounded-lg appearance-none"
              />
              <span className="text-sm ml-2">-{Math.floor((audioRef.current?.duration || 0 - (audioRef.current?.currentTime || 0)) / 60)}:{('0' + Math.floor((audioRef.current?.duration || 0 - (audioRef.current?.currentTime || 0)) % 60)).slice(-2)}</span>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center space-x-6">
              {playing ? (
                <FontAwesomeIcon icon={faPause} className="text-2xl cursor-pointer" onClick={pauseAudio} />
              ) : (
                <FontAwesomeIcon icon={faPlay} className="text-2xl cursor-pointer" onClick={playAudio} />
              )}
              <a href={audioUrl} download={`shloka_${shloka.shloka_number}.mp3`} className="text-2xl">
                <FontAwesomeIcon icon={faDownload} />
              </a>
            </div>
          </div>
        )}

        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
