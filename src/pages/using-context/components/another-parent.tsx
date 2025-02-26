import AnotherChild from './another-child';

function AnotherParent() {
  return (
    <div className="flex-1 p-5 border-4 rounded-full flex justify-center">
      <AnotherChild />
    </div>
  );
}

export default AnotherParent;
