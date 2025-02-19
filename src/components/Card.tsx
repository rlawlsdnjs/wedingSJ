import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import "./card.css";

// Card 컴포넌트 Props 타입 정의
interface CardProps {
    i: number; // 카드 인덱스
    title: string; // 카드 제목
    description: string; // 카드 설명
    src: string; // 이미지 소스 (파일명)
    link?: string; // 카드 상세 URL
    color: string; // 배경 색상
    progress: any; // 스크롤 진행상태 (useScroll에서 받은 값)
    range: [number, number]; // 스케일 범위
    targetScale: number; // 타겟 스케일 값
    isVisible: boolean; // 카드 표시 여부
}

const Card: React.FC<CardProps> = ({
    i,
    title,
    description,
    src,
    link,
    color,
    progress,
    range,
    targetScale,
    isVisible,
}) => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className={`cardContainer ${isVisible ? "visible" : "hidden"}`}>
            <motion.div
                style={{
                    backgroundColor: color,
                    scale, // 이 값은 scrollYProgress나 다른 상태에 따라 다르게 설정될 수 있음
                    top: `calc(-5vh + ${i * 20}px)`,
                }}
                initial={{ opacity: 1, y: 50 }}
                animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 50 }
                }
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card">
                <h2>{title}</h2>
                <div className="body">
                    <div className="description">
                        <p>{description}</p>
                        <span>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer">
                                See more
                            </a>
                            <svg
                                width="22"
                                height="12"
                                viewBox="0 0 22 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                                    fill="black"
                                />
                            </svg>
                        </span>
                    </div>

                    <div className="imageContainer">
                        <motion.div
                            className="inner"
                            style={{ scale: imageScale }}>
                            <img src={`/images/${src}`} alt={title} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Card;
