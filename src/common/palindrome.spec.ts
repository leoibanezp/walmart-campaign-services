import { Test } from '@nestjs/testing';
import { exec } from 'child_process';
import { IsPalindrome } from '../common/palindrome';

describe('PalindromeCommon', () => {
  describe('IsPalindrome', () => {
    it('Short text corresponding to the palindrome', () => {
      expect(true).toEqual(IsPalindrome('ana'));
      expect(true).toEqual(IsPalindrome('Eme'));
      expect(true).toEqual(IsPalindrome('Malayalam'));
      expect(true).toEqual(IsPalindrome('Nomon'));
      expect(true).toEqual(IsPalindrome('Reconocer'));
      expect(true).toEqual(IsPalindrome('Arañara'));
      expect(true).toEqual(IsPalindrome('Aviva'));
    });
    it('Long text corresponding to the palindrome', () => {
      expect(true).toEqual(IsPalindrome('A mamá Roma le aviva el amor a papá y a papá Roma le aviva el amor a mamá'));
      expect(true).toEqual(IsPalindrome('Amo la pacífica paloma'));
      expect(true).toEqual(IsPalindrome('Ana lleva al oso la avellana'));
      expect(true).toEqual(IsPalindrome('Eva usaba rimel y le miraba suave'));
      expect(true).toEqual(IsPalindrome('Oirás orar a Rosario'));
    });
  });
  describe('IsNotPalindrome', () => {
    it('Short text not corresponding to the palindrome', () => {
      expect(false).toEqual(IsPalindrome('leonardo'));
    });
    it('Long text not corresponding to the palindrome', () => {
      expect(false).toEqual(IsPalindrome('Lorem ipsum dolor sit amet, consectetur adipiscing elit'));
    });
    it('Text undefined', () => {
      expect(false).toEqual(IsPalindrome(undefined));
    });
    it('Text empty', () => {
      expect(false).toEqual(IsPalindrome(''));
    });
  });
});
