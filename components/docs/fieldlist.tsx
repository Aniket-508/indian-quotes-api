export default function FieldList({
  fields,
}: {
  fields: Record<string, string | number>;
}) {
  return (
    <ul className="list-inside list-disc space-y-2 text-gray-600">
      {Object.entries(fields).map(([key, description]) => (
        <li key={key}>
          <code className="rounded bg-gray-100 px-2 py-1 text-sm">{key}</code>:{" "}
          {description}
        </li>
      ))}
    </ul>
  );
}
