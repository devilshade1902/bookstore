import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Authors_carousal.css'; // Optional custom styles
import 'bootstrap/dist/css/bootstrap.min.css';


const authors = [
  {
    id: 1,
    name: "J.K. Rowling",
    image: "https://www.jkrowling.com/wp-content/uploads/2022/05/J.K.-Rowling-2021-Photography-Debra-Hurford-Brown-scaled.jpg",
  },
  {
    id: 2,
    name: "George R.R. Martin",
    image: "https://cdn.britannica.com/05/223205-050-8931FF28/American-writer-George-RR-Martin-2011.jpg",
  },
  {
    id: 3,
    name: "Agatha Christie",
    image: "https://cdn.britannica.com/88/213788-050-061733DC/English-novelist-Agatha-Christie-circa-1925.jpg",
  },
  {
    id: 4,
    name: "Stephen King",
    image: "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-172373-42-53337184.jpg",
  },
];

const AuthorsCarousel = () => {
  return (
    <Carousel interval={3000}>
      {authors.map((author) => (
        <Carousel.Item key={author.id}>
          <img
            className="d-block w-100 author-image"
            src={author.image}
            alt={author.name}
          />
          <Carousel.Caption>
            <h3>{author.name}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AuthorsCarousel;
