import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export interface NoMatchProps {
  msg: string;
}

export function NoMatch(props: NoMatchProps) {
  return (
    <div
      className={css`
        min-height: 100vh;
      `}
    >
      <h1>
        <span>ไม่พบข้อมูล</span>
        <span>
          <strong>{props?.msg}</strong>
        </span>
      </h1>
      <Link to={'/'}>
        <span
          className={css`
            border-bottom: solid 1px #646cff;
            padding-bottom: 0.25rem;
            :hover {
              border-bottom: solid 1px #535bf2;
            }
          `}
        >
          กลับไปหน้าหลัก
        </span>
      </Link>
    </div>
  );
}

export default NoMatch;
