// components/BackgroundBlogCard.jsx
import { Card, CardHeader, CardBody, Typography, Avatar } from "@material-tailwind/react";

export function BackgroundBlogCard({
  title,
  author,
  avatarSrc,
  bgSrc,
  className = "",
}) {
  return (
    <Card
      shadow={false}
      className={
        // equal sizes across the grid
        "relative grid aspect-[4/5] w-full items-end justify-center overflow-hidden text-center rounded-3xl" +
        className
      }
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
        style={{ backgroundImage: `url(${bgSrc})` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        <Typography variant="h2" color="white" className="mt-5 mb-6 font-medium leading-[1.5]">
          {title}
        </Typography>
        <Typography variant="h5" className="mb-4 text-gray-400">
          {author}
        </Typography>
      </CardHeader>

      <CardBody className="relative px-6 py-10 md:px-12">
        <Avatar
          size="xl"
          variant="circular"
          alt={author}
          className="border-2 border-white"
          src={avatarSrc}
        />
      </CardBody>
    </Card>
  );
}
