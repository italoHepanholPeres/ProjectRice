type DividerProp = {
  text: string;
};

export default function Divider({ text }: DividerProp) {
  return (
    <div className="text-4xl font-bold">
      {text}
      <hr className="border-2" />
    </div>
  );
}
