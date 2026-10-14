import Dither from '@/components/Dither/Dither'
import { usePageVisible } from '@/hooks/usePageVisible'

export default function DitherBackground() {
  const visible = usePageVisible()

  return (
    <div className="pointer-events-none fixed inset-0 z-0 size-full">
      <Dither
        className="opacity-[0.45]"
        backgroundColor="#07070b"
        palette={['#07070b', '#0f0f17', '#b6ff3b', '#ff2bd6']}
        waveColor="#ff2bd6"
        waveSpeed={0.03}
        waveAmplitude={0.18}
        colorNum={4}
        pixelSize={3}
        contrast={0.75}
        brightness={-0.12}
        scale={1.2}
        enableMouseInteraction={false}
        intro={false}
        clickRipple={false}
        dpr={1}
        disableAnimation={!visible}
      />
    </div>
  )
}
