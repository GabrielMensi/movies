import type { Metadata, ResolvingMetadata } from 'next';
import { generateDynamicSegment, getData } from '@/lib/util';
import Slider from '@/components/Slider';
import Image from 'next/image';
import { env } from '@/config/env';

export async function generateStaticParams() {
	const popular = await generateDynamicSegment('/movie/popular');
	const topRated = await generateDynamicSegment('/movie/top_rated');

	return popular.concat(topRated);
}

export async function generateMetadata(
	{ params }: { params: { id: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { id } = params;
	const movieDetail = await getData(`/movie/${id}`);

	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: movieDetail.title,
		description: movieDetail.overview,
		openGraph: {
			images: [
				`${env.IMAGES_BASE_URL}${movieDetail.poster_path}`,
				...previousImages,
			],
		},
	};
}

export default async function MovieDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;
	const similarMovies = await getData(`/movie/${id}/similar`);
	const movieDetail: MovieDetailsInterface = await getData(`/movie/${id}`);

	return (
		<>
			<section className="flex flex-col sm:grid sm:grid-cols-3 pb-24">
				<Image
					src={`${env.IMAGES_BASE_URL}${movieDetail.poster_path}`}
					width={342}
					height={512}
					alt={movieDetail.title}
					className="m-auto sm:m-0 sm:max-h-128 aspect-2/3 rounded-2xl"
					style={{
						viewTransitionName: `item-image-${movieDetail.id}`,
					}}
				/>
				<div className="col-span-2 flex flex-col justify-between p-5">
					<h1
						className="text-3xl font-bold mb-4"
						style={{
							viewTransitionName: `item-title-${movieDetail.id}`,
						}}
					>
						{movieDetail.title}
					</h1>
					<p className="mb-2">{movieDetail.tagline}</p>
					<p className="mb-4">{movieDetail.overview}</p>
					<div className="flex justify-between mb-2">
						<p className="text-gray-500">
							Release Date: {movieDetail.release_date}
						</p>
					</div>
					<div>
						<p className="mb-1 text-gray-500">
							Production Companies:
						</p>
						{movieDetail.production_companies.map(
							(company: any) => (
								<p
									key={company.id}
									className="text-gray-500 pl-4 mb-1"
								>
									{company.name}
								</p>
							),
						)}
					</div>
					<div className="flex flex-wrap gap-2 mt-4">
						{movieDetail.genres.map((genre: any) => (
							<div
								key={genre.id}
								className="flex items-center rounded-lg px-3 py-2 bg-gray-600"
							>
								<p className="text-base text-white text-center">
									{genre.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<Slider title="Similar Movies" list={similarMovies} type="movie" />
		</>
	);
}
