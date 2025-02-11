// --------------------------------------------------------------------------
// 클래스 컴포넌트 라이프사이클 메서드
import { tm } from '@/utils/tw-merge';
import { Component, ErrorInfo } from 'react';

// 속성(props)
interface Props {
  count?: number;
  step?: number;
  min?: number;
  max?: number;
}

type RequiredProps = Required<Props>;

// 상태(state)
interface State {
  count: number;
  doubleCount?: number;
  error: null | Error;
  errorInfo: null | ErrorInfo;
}

class Counter extends Component<Props, State> {
  // 기본 속성 값 설정
  static defaultProps: RequiredProps = {
    count: 9,
    step: 1,
    min: 0,
    max: 10,
  };

  // [라이프사이클 메서드] ---------------------------------------------
  // 생성(constructor) 시점
  constructor(props: Props) {
    // 반드시 호출되어야 함!
    // React.Component 클래스를 슈퍼 클래스로 사용할 때 props를 전달해야 함!
    super(props);

    // 컴포넌트 상태 선언
    // 클래스 인스턴스 멤버
    // this.state = {
    //   count: props.count ?? Counter.defaultProps.count,
    // };

    // this 바인딩
    // this.handleDecrease = this.handleDecrease.bind(this);
    // this.handleIncrease = this.handleIncrease.bind(this);
  }

  // [라이프사이클 메서드] ---------------------------------------------
  // 외부 데이터(props)로부터 파생된 상태(derived state) 설정 시점
  static getDerivedStateFromProps(
    _props: Readonly<RequiredProps>,
    state: Readonly<State>
  ) {
    // console.log(
    //   '외부 데이터(props)로부터 파생된 상태(derived state) 설정 시점'
    // );
    // console.log(props);

    // 파생된 상태 (derived state)
    return {
      // doubleCount: props.count * 2,
      doubleCount: state.count * 2,
    };
  }

  // <클래스 필드>
  state: State = {
    count: this.props.count ?? Counter.defaultProps.count,
    error: null,
    errorInfo: null,
  };

  // [라이프사이클 메서드] ---------------------------------------------
  // 컴포넌트 렌더링 진행 유무 결정 시점
  // <주의!!!> 오직 성능 최적화 만을 위해 사용!!
  shouldComponentUpdate(
    nextProps: Readonly<RequiredProps>,
    nextState: Readonly<State>
  ): boolean {
    const { min, max } = nextProps as RequiredProps;

    if (max < nextState.count) {
      console.log('count 값이 max 범위를 넘어서서 렌더링 차단됨');
      this.setState({
        count: max,
      });
      return false;
    }

    if (min > nextState.count) {
      console.log('count 값이 min 범위를 넘어서서 렌더링 차단됨');
      this.setState({
        count: min,
      });
      return false;
    }

    return true;

    // 렌더링 해라
    // return true;
    // 렌더링 하지마라
    // return false;
  }

  // [라이프사이클 메서드] ---------------------------------------------
  // 렌더(render) 시점
  render() {
    // 컴포넌트 데이터(속성, 상태) 접근 가능
    // console.log(this.props);
    // console.log(this.state);

    return (
      <div className={tm('flex flex-col gap-2 items-start')}>
        <h2 className="sr-only">카운터</h2>
        <output className={tm('font-semibold text-3xl text-react')}>
          {this.state.count} <span className="font-thin">/</span>{' '}
          {this.state.doubleCount}
        </output>
        <div className={tm('flex', '*:hover:bg-sky-800 *:cursor-pointer')}>
          <button
            type="button"
            className={tm('px-6 py-1 bg-react text-white rounded-l-full')}
            onClick={this.handleDecrease}
          >
            -{this.props.step}
          </button>
          <button
            type="button"
            className={tm('px-6 py-1 bg-react text-white rounded-r-full')}
            onClick={this.handleIncrease}
          >
            +{this.props.step}
          </button>
        </div>
      </div>
    );
  }

  // [라이프사이클 메서드] ---------------------------------------------
  getSnapshotBeforeUpdate() {
    // 이전 속성 또는 상태와 현재 렌더링 시점의 속성 또는 상태 비교
    // prevProps: Readonly<Props>,
    // prevState: Readonly<State>
    //
    // ui가 부자연 스러우면... 스냅샷 데이터 반환
    // snapshot 데이터
    // return snapshot;
    return null;
  }

  // <클래스 필드>
  clearIntervalId: NodeJS.Timeout | number = 0;

  // [라이프사이클 메서드] ---------------------------------------------
  // 컴포넌트 마운트(component did mount) 이후 시점

  componentDidMount() {
    // 리액트 렌더링 프로세스와 상관없는 이펙트 실행 (사이드 이펙트 처리)
    // const clearId =

    // 타이머 이벤트 구독
    console.log('타이머 이벤트 구독');
    this.clearIntervalId = setInterval(() => {
      console.log(new Date().toLocaleTimeString());
      // alert('타이머(사이드 이펙트) 처리');
      // clearTimeout(clearId);
      // console.log('타이머 클리어!');
    }, 1000);
  }

  // 컴포넌트 업데이트(component did update) 이후 시점
  componentDidUpdate(
    _prevProps: Readonly<Props>,
    prevState: Readonly<State>
    // _snapshot: unknown
  ): void {
    console.group('이전 상태 값');
    // console.log({ prevProps });
    console.log(prevState.count);
    console.groupEnd();

    console.group('현재 상태 값');
    console.log(this.state.count);
    console.groupEnd();

    // 부자연스러운 UI 움직임을 정상적으로 보이도록 처리 (사이드 이펙트)
    // 스냅샷 정보 활용

    // 사이드 이펙트
    // 리액트 렌더링 프로세스와 상관없는 일 처리
    if (this.state.count > 9) {
      document.body.classList.add('bg-react', 'text-react');
    } else {
      document.body.classList.remove('bg-react', 'text-react');
    }
  }

  // 컴포넌트 언마운트(component will unmount) 이전 시점
  componentWillUnmount() {
    console.log('Counter 언마운트 될 예정');
    // 타이머 이벤트 구독 해지
    console.log('타이머 이벤트 구독 해지');
    clearInterval(this.clearIntervalId);
  }

  // [라이프사이클 메서드] ---------------------------------------------
  // 정적(클래스) 멤버
  static getDerivedStateFromError(error: Error) {
    return {
      error,
    };
  }

  // 인스턴스 멤버
  // 오류 감지(error catch)
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo, // { componentStack, digest }
    });
  }

  // <클래스 필드>
  // 이벤트 핸들러 ---------------------------------------------------
  // [이벤트 핸들러]
  handleDecrease = () => {
    const { step } = this.props;

    if (step) {
      this.setState({
        count: this.state.count - step,
      });
    }
  };

  handleIncrease = () => {
    const { step } = this.props;

    if (step) {
      this.setState({
        count: this.state.count + step,
      });
    }
  };
}

export default Counter;
