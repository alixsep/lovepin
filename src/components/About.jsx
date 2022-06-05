import React from 'react';

import './about.scss';

import { GithubSVG, InstagramSVG, LoveSVG } from '../svg';
import packageJson from '../../package.json';

const Separator = () => <p className='separator'>{'∘₊✦✧✦✧──────✦✧✦✧₊∘'}</p>;
const ContactLink = ({ children, link, title }) => (
  <a className='contact-link' href={link}>
    <span className='svg-container'>{children ? children : null}</span>
    <span className='txt'>{title}</span>
  </a>
);

const About = () => {
  return (
    <div className='about'>
      <p className='version prg'>
        <span>Version:</span>
        <span>{packageJson.version}</span>
      </p>
      <Separator />
      <p className='prg'>
        Lovepin is an open-source dictionary-alike progressive web app. It's not
        a dictionary. Instead it only contains the Oxford5000 words, from level
        A1 all the way up to level C2.
      </p>
      <p className='prg'>
        You can use this app to easily learn these words. People who want to
        take IELTS exam would find this app really handy.
      </p>
      {/* <p>
        Lovepin also lets you like/pin words just like how you like posts on
        instagram, so later you can have them listed in the love list section.
        And if you are familiar with Leitner System, this app implements it!
        Your liked words will be automatically put into boxes and you don't need
        to waste papers or use a separate app anymore.
      </p> */}
      <Separator />
      <p className='prg'>
        App created with{' '}
        <span>
          <LoveSVG on={true} />
        </span>{' '}
        by Alixsep
      </p>
      <span className='contact-title'>Contact:</span>
      <ContactLink
        link={'http://instagram.com/_u/alixsepofficial/'}
        title={'Instagram'}
      >
        <InstagramSVG />
      </ContactLink>
      <ContactLink link={'https://github.com/alixsep'} title={'Github'}>
        <GithubSVG />
      </ContactLink>
      <p>Email: alixsep@outlook.com</p>
    </div>
  );
};

export default About;
