import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../styles/List.module.css";
function CharacterList({ id, thumbnail, name }) {
  return (
    <li key={id} className={styles.item}>
      <Link to={`/character/${id}`}>
        <div className={styles.imgBox}>
          <img src={thumbnail.path + "." + thumbnail.extension} alt={name} />
        </div>
        <div className={styles.name}>{name}</div>
      </Link>
    </li>
  );
}

CharacterList.prototype = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired
};

export default CharacterList;
