import { Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';

export interface CardShortUrlDetailProps {
  to: string;
}

export function CardShortUrlDetail(props: CardShortUrlDetailProps) {
  return (
    <Card>
      <CardContent
        className={css`
          text-align: center;
        `}
      >
        <Link to={props?.to}>
          <span>{props?.to}</span>
        </Link>
      </CardContent>
    </Card>
  );
}

export default CardShortUrlDetail;
