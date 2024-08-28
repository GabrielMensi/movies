import { Link } from 'next-view-transitions';
import { env } from '@/config/env';
import Image from 'next/image';

export default function Card({
	data,
	type,
}: {
	data: any;
	type: 'movie' | 'tv-show';
}) {
	const containerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		width: '224px',
		height: '336px',
		borderRadius: '16px',
		overflow: 'hidden',
		boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
	};

	const imageStyle: React.CSSProperties = {
		inset: '0',
		height: '80%',
		width: '100%',
		objectFit: 'cover',
		borderRadius: '16px',
		viewTransitionName: `item-image-${data.id}`,
	};

	const titleStyle: React.CSSProperties = {
		marginTop: '0.5rem',
		fontSize: '1.25rem',
		fontWeight: 'bold',
		color: '#fff',
		letterSpacing: '0.05em',
		viewTransitionName: `item-title-${data.id}`,
	};

	return (
		<Link
			href={`/${type == 'movie' ? 'movies' : 'tv-shows'}/${data.id}`}
			style={containerStyle}
		>
			<Image
				alt=""
				src={`${env.IMAGES_BASE_URL}${data.poster_path}`}
				height={336}
				width={224}
				style={imageStyle}
			/>
			<h3 style={titleStyle}>
				{`${type == 'movie' ? data.title : data.name}`}
			</h3>
		</Link>
	);
}
