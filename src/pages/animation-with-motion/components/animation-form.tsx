import AnimationControl from './animation-control';

interface AnimationFormProps {
  options: {
    x: number;
    y: number;
    rotate: number;
    scale: number;
  };
  onChangeOptions: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AnimationForm({ options, onChangeOptions }: AnimationFormProps) {
  return (
    <form className="order-0 flex flex-col gap-0.5 w-60 *:accent-react">
      <AnimationControl label="X" name="x" onChange={onChangeOptions}>
        {options.x}
      </AnimationControl>
      <AnimationControl label="Y" name="y" onChange={onChangeOptions}>
        {options.y}
      </AnimationControl>
      <AnimationControl
        label="Scale"
        name="scale"
        min={0.5}
        step={0.5}
        max={2}
        onChange={onChangeOptions}
      >
        {options.scale}
      </AnimationControl>
      <AnimationControl
        label="Rotate"
        name="rotate"
        min={-360}
        max={360}
        step={45}
        onChange={onChangeOptions}
      >
        {options.rotate}
      </AnimationControl>
    </form>
  );
}

export default AnimationForm;
