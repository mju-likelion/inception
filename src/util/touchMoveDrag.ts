interface touchMoveProps {
  event: React.TouchEvent<HTMLDivElement>;
  isMouseDown: boolean;
  previousTarget: HTMLButtonElement | undefined;
  setPreviousTarget: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | undefined>
  >;
}

export const touchMoveDrag = ({
  event,
  isMouseDown,
  previousTarget,
  setPreviousTarget,
}: touchMoveProps) => {
  const target = document.elementFromPoint(
    event.touches[0].clientX,
    event.touches[0].clientY
  ) as HTMLButtonElement;

  if (
    isMouseDown &&
    target?.nodeName === 'BUTTON' &&
    target !== previousTarget
  ) {
    target.click();
    setPreviousTarget(target);
  }
};
