import React, { Fragment } from 'react';
import {
  get,
  map,
  uniq,
  without } from 'lodash';

/**
 * Returns array of unique languages from the list of files provided.
 * Github seems to send through 'null' language for whatever reason,
 * these are filtered out. However, if the requirement is to keep them
 * then this method can be modified to return a placeholder for null langs
 *
 * @method extractUniqueLangsFromFiles
 * @param {Array} files
 * @return {Array}
 */
const extractUniqueLangsFromFiles = files =>
  uniq(
    without(
      map(files, (file) => get(file, 'language', 'Unknown')),
    null)
  )
;

// Note: perfectly OK to use lang as key in the following as we are rendering unique
// entities and the keys only need to be unique within the realm of this component
const Langs = props =>
  <section className="langs">
    <span>Filetypes:</span> {extractUniqueLangsFromFiles(props.files).map((lang) => <div key={lang} className="lang">{lang}</div>)}
  </section>
;

export default Langs;