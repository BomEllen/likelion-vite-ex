import { tm } from '@/utils/tw-merge';
import { motion } from 'motion/react';
import { useState } from 'react';
import AnimationForm from './animation-form';
import TiltBox from '@/pages/access-dom/components/tilt-box';

function MotionComponent() {
  // [상태 선언] 애니메이션 속성 객체
  const [options, setOptions] = useState({
    scale: 1,
    rotate: 0,
    x: 0,
    y: 0,
  });

  const handleChangeOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setOptions((options) => ({
      ...options,
      [name]: Number(value),
    }));
  };

  return (
    <div lang="en" className="flex gap-10 p-2">
      <TiltBox className={tm('order-1', 'w-42 h-24.5')}>
        <motion.div
          animate={options}
          className={tm(
            'w-[inherit] h-[inherit] p-4',
            'font-thin tracking-wide text-2xl',
            'leading-[1.1]'
          )}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          Motion for <b className="font-bold">React</b>
        </motion.div>
      </TiltBox>

      <AnimationForm options={options} onChangeOptions={handleChangeOptions} />
    </div>
  );
}

export default MotionComponent;
