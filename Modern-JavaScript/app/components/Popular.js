import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './utils/api';
import Loading from './Loading';

function RepoGrid (props) {
  return (
    <ul className="popular_list">
      {props.repos.map(function (repo, index) {
        return (
          <li
            key={repo.name}
            className="popular_item"
          >
            <div className="popular_rank">
              #{index + 1}
            </div>
            <ul className="space_list_items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'PHP'];
  return (
    <ul className="languages">
      {languages.map(function (lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d21034'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}
          >
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

class Popular extends Component {
  constructor (props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null,
      }
    });
    Api.fetchPopularRepos(lang)
      .then(function(repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        });
      }.bind(this));
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos 
            ? <Loading text='LoAdInG! but with PrOpS.' />
            : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default Popular