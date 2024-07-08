import Card from "@/components/Card";

export default function Slider({ title, list, type }: {title: string, list: any, type: any}) {
    return (
        <section className="flex flex-col gap-4 pb-20">
            <h2 className="text-4xl font-bold pb-8">{title}</h2>
            <div className="flex gap-4 overflow-x-auto">
                {list.results
                .slice(0, 5)
                .map((data: MovieInterface) => (
                        <Card key={data.id} data={data} type={type} />
                    ))}
            </div>
        </section>
    );
}
