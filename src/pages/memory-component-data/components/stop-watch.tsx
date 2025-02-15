import { tm } from '@/utils/tw-merge';
import { useEffect, useRef, useState } from 'react';
import { PauseSolid, PlaySolid, StopSolid } from '@mynaui/icons-react';

/*
  // reset time
  const startTime = Date.now();
  let nowTime = Date.now();

  // start
  const clearIntervalId = setInterval(() => {
    // update now time
    nowTime = Date.now();
    console.log((nowTime - startTime) / 1000);
  }, 1000 / 60);

  clearInterval(clearIntervalId);
*/

// Frame Per Seconds
const FPS = 1000 / 60;

// 호출 시점의 현재 시간 값 반환 함수
const getDateNow = () => Date.now();

// 타임 포멧팅 함수
// recordTime + nowTime - startTime
const formatTime = (time: number) => {
  // 밀리초(miliseconds)
  const miliseconds = parseInt(`${time % 100}`, 10);

  // 초(seconds) = 1000ms
  const seconds = parseInt(`${(time / 1000) % 60}`, 10);

  // 분(minutes) = 60s
  const minutes = parseInt(`${(time / (1000 * 60)) % 60}`, 10);

  // 시(hours) = 60m
  const hours = parseInt(`${(time / (1000 * 60 * 60)) % 60}`, 10);

  // 숫자값을 2자리로 설정
  // 예) 0  →  "00"
  const [hh, mm, ss, ms] = [hours, minutes, seconds, miliseconds].map(
    (time) => {
      return time.toLocaleString('ko-KR', {
        minimumIntegerDigits: 2,
      });
    }
  );

  return `${hh}:${mm}:${ss}:${ms}`;
};

// [해설 질문]
// const timeInfo = formatTime(recordTime + nowTime - startTime);
//
// [start]
// startTime = 21921
// nowStart = 21921
// recordTime = 0
// ... nowStart = 34500
//
// [pause] nowStart - startTime = 34500 - 21921 = 12579
// recordTime = recordTime + nowStart - startTime = 0 + 12579 = <12579>
//
// [start]
// startTime = 31273
// nowStart = 31273
// ... nowStart = 61720
//
// [pause] nowStart - startTime = 61720 - 31273 = 30447
// startTime = 81273
// nowStart = 81273
// recordTime = recordTime + nowStart - startTime = 12579 + 30447 = <43026>
//
// [stop]
// startTime = 91273
// nowStart = 91273
// recordTime = 0
// recordTime = recordTime + nowStart - startTime = 0 + 0 - 0 = <0>

// setInteval 함수 반환 타입
type IntervalId = ReturnType<typeof setInterval>;

// 컴포넌트 --------------------------------------------------------
function StopWatch() {
  // [상태]
  // 스톱워치 시작 시간
  const [startTime, setStartTime] = useState(getDateNow);

  // 스톱워치 시작한 후, 진행되는 현재 시간
  const [nowTime, setNowTime] = useState(getDateNow);

  // 스톱워치 일시정지 시, 기록될 시간
  const [recordTime, setRecordTime] = useState(0);

  // 스톱워치 시작 여부
  const [isStart, setIsStart] = useState(false);

  // 시작 시간과 진행 시간을 초기화
  const resetTime = () => {
    setStartTime(getDateNow);
    setNowTime(getDateNow);
  };

  // 렌더링과 무관한 컴포넌트 데이터 기억할 필요성
  // 브라우저 API: setInterval 중지를 위해
  // React 탈출구인 useRef 훅을 활용

  // [이펙트]
  // 외부 시스템인 브라우저 API와 동기화
  // 참조(ref) 객체를 사용해 인터벌을 중지할 ID 기억
  const clearIntervalIdRef = useRef<IntervalId>(undefined);

  useEffect(() => {
    if (isStart) {
      resetTime();
      clearIntervalIdRef.current = setInterval(() => {
        setNowTime(getDateNow);
      }, FPS);
    } else {
      clearInterval(clearIntervalIdRef.current);
      setRecordTime((recordTime) => recordTime + nowTime - startTime);
      resetTime();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart]);

  // [이벤트 핸들러]
  // 시작 또는 일시정지 상태 토글 이벤트 핸들러
  const handleStartOrPause = () => {
    setIsStart((s) => !s);
  };

  const handleStop = () => {
    setIsStart(false);
    setRecordTime(0);
    resetTime();
  };

  // [파생된 상태]
  // 타임 포멧팅
  // "hh:mm:ss:ms"
  const timeInfo = formatTime(recordTime + nowTime - startTime);

  return (
    <article aria-label="스톱워치" className="flex flex-col gap-2">
      <time
        dateTime={timeInfo}
        className="px-4 py-2 bg-black text-white text-lg text-center w-46 font-mono rounded-full"
      >
        {timeInfo}
      </time>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={handleStartOrPause}
          aria-label={isStart ? '일시정지' : '시작'}
          title={isStart ? '일시정지' : '시작'}
          className={tm(
            'cursor-pointer opacity-75',
            'grid place-content-center',
            'bg-react text-white px-7 py-0.5 rounded-full font-semibold',
            'hover:opacity-100'
          )}
        >
          {/* {isStart ? '일시정지' : '시작'} */}
          {isStart ? <PauseSolid /> : <PlaySolid />}
        </button>
        <button
          type="button"
          onClick={handleStop}
          aria-label="정지"
          title="정지"
          className={tm(
            'cursor-pointer opacity-90',
            'grid place-content-center',
            'bg-sky-600 text-white px-7 py-0.5 rounded-full font-semibold',
            'hover:opacity-100'
          )}
        >
          {/* 정지 */}
          <StopSolid />
        </button>
      </div>
    </article>
  );
}

export default StopWatch;
