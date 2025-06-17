import { useState, useEffect, useRef } from 'react';
import '../styles/Countdown.css';

const Countdown: React.FC = () => {
  const [time, setTime] = useState<number>(() => {
    const savedTime = localStorage.getItem('countdown-time');
    return savedTime ? parseInt(savedTime) : 60;
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputMinutes, setInputMinutes] = useState<string>(Math.floor(time / 60).toString());
  const [inputSeconds, setInputSeconds] = useState<string>((time % 60).toString().padStart(2, '0'));
  
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Audio für den Alarm erstellen
    audioRef.current = new Audio('/alarm.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Timer-Logik
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            setIsRunning(false);
            if (audioRef.current) audioRef.current.play();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    // Speichere die Zeit im LocalStorage
    localStorage.setItem('countdown-time', time.toString());
  }, [time]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startCountdown = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsRunning(true);
  };

  const pauseCountdown = () => {
    setIsRunning(false);
  };

  const resetCountdown = () => {
    setIsRunning(false);
    if (audioRef.current) audioRef.current.pause();
    
    // Konvertiere Eingaben in Zahlen und setze den Timer
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    const totalSeconds = minutes * 60 + seconds;
    
    setTime(totalSeconds > 0 ? totalSeconds : 60);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'minutes' | 'seconds') => {
    const value = e.target.value;
    
    if (!/^\d*$/.test(value)) return; // Nur Zahlen erlauben
    
    if (type === 'minutes') {
      setInputMinutes(value);
    } else {
      // Begrenze Sekunden auf 0-59
      const seconds = parseInt(value) || 0;
      setInputSeconds(seconds > 59 ? '59' : value);
    }
  };

  const handleBlur = () => {
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    const totalSeconds = minutes * 60 + seconds;
    
    setTime(totalSeconds > 0 ? totalSeconds : 60);
    setInputMinutes(minutes.toString());
    setInputSeconds(seconds.toString().padStart(2, '0'));
  };

  return (
    <div className="countdown-component">
      {isRunning || time === 0 ? (
        <div className="countdown-display">
          <span className={time === 0 ? 'time-up' : ''}>{formatTime(time)}</span>
        </div>
      ) : (
        <div className="time-input">
          <input
            type="text"
            value={inputMinutes}
            onChange={(e) => handleInputChange(e, 'minutes')}
            onBlur={handleBlur}
            aria-label="Minuten"
            maxLength={2}
          />
          <span>:</span>
          <input
            type="text"
            value={inputSeconds}
            onChange={(e) => handleInputChange(e, 'seconds')}
            onBlur={handleBlur}
            aria-label="Sekunden"
            maxLength={2}
          />
        </div>
      )}

      <div className="countdown-controls">
        {!isRunning && time > 0 && (
          <button 
            className="countdown-btn start" 
            onClick={startCountdown}
            aria-label="Starten"
          >
            Start
          </button>
        )}
        
        {isRunning && (
          <button 
            className="countdown-btn pause" 
            onClick={pauseCountdown}
            aria-label="Pausieren"
          >
            Pause
          </button>
        )}
        
        <button 
          className="countdown-btn reset" 
          onClick={resetCountdown}
          aria-label="Zurücksetzen"
        >
          Reset
        </button>
        
        {time === 0 && (
          <button 
            className="countdown-btn stop-alarm" 
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              resetCountdown();
            }}
            aria-label="Alarm stoppen"
          >
            Alarm stoppen
          </button>
        )}
      </div>
    </div>
  );
};

export default Countdown;
